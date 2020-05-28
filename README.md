# Covid-biome backend

Backend for generating plots on https://bioinfo.imd.ufrn.br/covid19/data-visualization

## Development instructions

Create .env file at the project root with two lines:
* VOL_FOLDER=/path/to/json/files
* COMMAND=start

The default folder for the .json files is external/ however any other can be used.

Run 

    docker-compose up 

to start the development environment. The server will start at port 5000, with nodemon enabled.

## Deployment instructions

Do

    git pull https://github.com/guilherme-araujo/biome-covid19-backend.git

then create .env file at the projet root with two lines:
* VOL_FOLDER=/path/to/json/files
* COMMAND=run prod

Then, run 

    docker-compose up 

to start the production environment. The server will start at port 5000.

