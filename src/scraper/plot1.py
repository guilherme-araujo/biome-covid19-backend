import seaborn as sns
import sys
import csv
from statistics import stdev
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib as mpl

covid_norm2 = pd.read_csv('cumulativo.csv')

covid_norm2['date'] = pd.to_datetime(covid_norm2['date'], errors='coerce', format='%d/%m/%Y')

version_str = sys.argv[1]

fig_dims = (6, 4)
fig, ax = plt.subplots(figsize=fig_dims)

#-----FIGURA 1-----
g = sns.lineplot(data=covid_norm2, x="date", y="cumulative", hue="country")

box = g.get_position()
g.set_position([box.x0, box.y0, box.width * 0.8, box.height * 1.1])
g.legend(loc='center right', bbox_to_anchor=(1.5, 0.5), ncol=1)

ax.set_xlim(covid_norm2['date'].min(), covid_norm2['date'].max())
ax.xaxis.set_major_locator(mdates.DayLocator(interval=20) )
ax.xaxis.set_major_formatter(mdates.DateFormatter('%m-%d'))
ax.yaxis.set_major_formatter(mpl.ticker.StrMethodFormatter('{x:,.0f}'))
ax.set(xlabel="Date", ylabel="Total Cases (cumulative)" )

plt.setp(ax.get_xticklabels(), rotation=45, horizontalalignment='right')

plt.savefig(version_str+"-01.png", dpi=200, bbox_inches = "tight")
