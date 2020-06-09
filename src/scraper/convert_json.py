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

for date in sorted_dates:
    this_date = covid_norm2.loc[covid_norm2["date"]==date]
    
    line = {"date": pd.to_datetime(date).strftime('%m/%d') }

    for country in countries:
        cumulative = this_date.loc[this_date["code"]==country,"cumulative"]
        country_cumulative = int(cumulative) if not cumulative.empty else 0
        line.update({ 
            country: country_cumulative 
        })

    result.append(line)

dataf = pd.DataFrame(result)
pd.DataFrame.from_dict(result).to_json('covid_norm-'+pd.to_datetime('today').strftime('%m-%d')+'.json', indent=4, orient="records")


