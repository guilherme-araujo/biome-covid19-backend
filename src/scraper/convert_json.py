import sys
import csv
import pandas as pd
import numpy as np

covid_norm2 = pd.read_csv('cumulativo.csv')
covid_norm2['date'] = pd.to_datetime(covid_norm2['date'], errors='coerce', format='%d/%m/%Y')

sorted_dates = covid_norm2["date"].unique()
sorted_dates.sort()
countries = covid_norm2["code"].unique()

result = []

i=0
for date in sorted_dates:
    this_date = covid_norm2.loc[covid_norm2["date"]==date]
    
    line = {"date": pd.to_datetime(date).strftime('%m/%d') }

    for country in countries:
        cumulative = this_date.loc[this_date["code"]==country,"cumulative"]
        country_cumulative = int(cumulative) if not cumulative.empty else 0
        if(country_cumulative==0):
            continue
        line.update({ 
            country: country_cumulative 
        })

    if i % 7 == 0:
        result.append(line)
    i+=1

df = pd.DataFrame(result)
dataf = df[df.index % 3 == 0]
pd.DataFrame.from_dict(result).to_json('covid_norm-'+pd.to_datetime('today').strftime('%m-%d')+'.json', indent=4, orient="records")


