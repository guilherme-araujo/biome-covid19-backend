import seaborn as sns
import sys
import csv
from statistics import stdev
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib as mpl

covid_norm = pd.read_csv('covid-normalizado.csv', decimal='.')

covid_norm['date'] = pd.to_datetime(covid_norm['date'], errors='coerce', format='%d/%m/%Y')

version_str = sys.argv[1]

fig_dims = (6, 4)
fig, ax = plt.subplots(figsize=fig_dims)

#-----FIGURA 3-----
fig, ax = plt.subplots()

covid_norm = covid_norm.dropna(thresh=1)
covid_norm['date'] = covid_norm['date'].map(lambda x: x.strftime('%m-%d'))

def plot(x, y, data=None, label=None, **kwargs):    
    sns.lineplot(x, y, data=data, label=label, **kwargs)

g = sns.FacetGrid(covid_norm, col="country", col_wrap=2, sharex=False, sharey=False, hue="country")
g.map_dataframe(plot, 'date', 'media3days')

g.set_axis_labels('', '') 
g.set_titles('{col_name}')

for ax in g.axes.flatten():
    ax.tick_params(labelbottom=True)

# overall ylabel
g.fig.text(x=0.01, y=0.5, 
           verticalalignment='center', #make sure it's aligned at center vertically
           s='Cases per 100 tests (average of three days)', #this is the text in the ylabel
           size=12, #customize the fontsize if you will
           rotation=90) #vertical text

#overall xlabel
g.fig.text(x=0.5, y=0.01, 
           horizontalalignment='center', #make sure it's aligned at center horizontally
           s='Date', #this is the text in the xlabel
           size=12)

for ax in g.axes.flat:
    labels = ax.get_xticklabels()
    for i,l in enumerate(labels):
        if ((i+4)%21 != 0 ): labels[i] = ''
        ax.set_xticklabels(labels, rotation=90)

g.fig.tight_layout()

plt.subplots_adjust(left=0.075, right=1.0, top=1.0, bottom=0.13)
plt.savefig(version_str+"-03.png", dpi=200, bbox_inches = "tight")
