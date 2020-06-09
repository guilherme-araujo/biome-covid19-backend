const express = require('express');
const fs = require('fs');

const routes = express.Router();


routes.get('/covid_norm', function (req, res) {    
    fs.readFile('src/scraper/covid_norm-06-09.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot2', function (req, res) {    
    fs.readFile('src/scraper/covid_norm-plot2-06-09.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot3', function (req, res) {    
    fs.readFile('src/scraper/covid_norm-plot3-06-09.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot4', function (req, res) {    
    fs.readFile('src/scraper/covid_norm-plot4-06-09.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-06-01', function (req, res) {    
    fs.readFile('external/covid_norm-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot2-06-01', function (req, res) {    
    fs.readFile('external/covid_norm-plot2-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot3-06-01', function (req, res) {    
    fs.readFile('external/covid_norm-plot3-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot4-06-01', function (req, res) {    
    fs.readFile('external/covid_norm-plot4-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

module.exports = routes;