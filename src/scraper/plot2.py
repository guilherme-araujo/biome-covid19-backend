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

#-----FIGURA 2-----
g = sns.lineplot(data=covid_norm2, x="cumulative", y="confirmed", hue="country", estimator=None)
ax.set(xscale="log", yscale="log")
ax.set(xlabel="Total cases (log scale)", ylabel="New Cases (log scale)" )

box = g.get_position()
g.set_position([box.x0, box.y0, box.width * 0.9, box.height])
g.legend(loc='center right', bbox_to_anchor=(1.45, 0.5), ncol=1)

#plt.show()
plt.savefig(version_str+"-02.png", dpi=200, bbox_inches = "tight")
