#!/bin/bash

cd "$(dirname "$0")"

rm ./covid*.json
rm ./owid*
rm ./*.csv

wget https://covid.ourworldindata.org/data/owid-covid-data.json
wget https://covid.ourworldindata.org/data/testing/covid-testing-all-observations.csv

npm install

node pre-script.js

python3 convert_json.py
python3 convert_json-plot2.py
python3 convert_json-plot3.py
python3 convert_json-plot4.py

DATE=$(node post-script.js)

python3 plot1.py $DATE
python3 plot2.py $DATE
python3 plot3.py $DATE
python3 plot4.py $DATE

mkdir ../../external/$DATE
mv covid_norm* ../../external/$DATE
mv *.png ../../external/$DATE
