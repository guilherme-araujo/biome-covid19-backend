import seaborn as sns
import sys
import csv
from statistics import stdev
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib as mpl

covid_deaths = pd.read_csv('deaths.csv')

covid_deaths['total'] = covid_deaths['total'].replace({0: np.nan})
covid_deaths['daily'] = covid_deaths['daily'].replace({0: np.nan})

version_str = sys.argv[1]

fig_dims = (6, 4)
fig, ax = plt.subplots(figsize=fig_dims)

# -----FIGURA 4------
def plot(x, y, data=None, label=None, **kwargs):    
    g = sns.scatterplot(x, y, data=data, label=label, **kwargs)
    g.set(xscale='log')
    g.set(yscale='log')

g = sns.FacetGrid(covid_deaths, col="country", col_wrap=3, sharex=False, sharey=False, hue="country")

g.map_dataframe(plot, 'total', 'daily')

g.set_axis_labels('', '') 
g.set_titles('{col_name}')

for ax in g.axes.flatten():
    ax.tick_params(labelbottom=True)
   
# overall ylabel
g.fig.text(x=0.01, y=0.5, 
           verticalalignment='center', #make sure it's aligned at center vertically
           s='New Deaths (log scale)', #this is the text in the ylabel
           size=12, #customize the fontsize if you will
           rotation=90) #vertical text

g.fig.text(x=0.5, y=0.01, 
           horizontalalignment='center', #make sure it's aligned at center horizontally
           s='Total Deaths (log scale)', #this is the text in the xlabel
           size=12)

plt.savefig(version_str+"-04.png", dpi=200, bbox_inches = "tight")
