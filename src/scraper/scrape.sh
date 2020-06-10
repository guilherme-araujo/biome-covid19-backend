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

node post-script.js

mv covid_norm* ../../external
