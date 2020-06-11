# Covid-biome backend

Backend for generating plots on https://bioinfo.imd.ufrn.br/covid19/data-visualization

## Development instructions


The default folder for the .json files is external/ however any other can be used.

Run 

    docker-compose up --build -V

to start the development environment. The server will start at port 5000, with nodemon enabled.

Stop it with

    docker-compose down

## Deployment instructions

Do

    git pull https://github.com/guilherme-araujo/biome-covid19-backend.git


Then, run 

    docker-compose up --build -V

to start the production environment. The server will start at port 5000, with nodemon enabled for updates on data fetched by the scraper.

Stop it with

    docker-compose down

## API

* /dates
    
    * GET - Pulls list of dates avaliable 
    * POST - Inserts new list of dates avaliable. Required object must contain "dates" array of dates on "mm-dd" format and "key" string with predefined secret 

* /active-date

    * GET - Pulls current active date
    * POST - Inserts new active date. Required object must contain "date" string on "mm-dd" format and "key" string with predefined secret

* /covid_norm/:date?

    * GET - first plot data. Optional date param. If not given, will pull according to the active date.

* /covid_norm-plot2/:date?

    * GET - second plot data. Optional date param. If not given, will pull according to the active date.

* /covid_norm-plot3/:date?

    * GET - third plot data. Optional date param. If not given, will pull according to the active date.

* /covid_norm-plot4/:date?

    * GET - fourth plot data. Optional date param. If not given, will pull according to the active date.

## Scraping command

Run 

    docker exec -it biome-covid19-backend_app_1 /usr/app/src/scraper/scrape.sh 
    
to scrape new daily data from owid - Our World in Data https://ourworldindata.org/coronavirus
Replace the container name if needed according to docker ps


## Default data

db folder contains list of dates and active date according to src/scraper/dbinit.js and the files at external/ folder. The database and the files at external/ are updated according to scraper calls. It is recommended that a daily call is scheduled on the host.
