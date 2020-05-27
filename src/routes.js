const express = require('express');
const fs = require('fs');

const routes = express.Router();


routes.get('/covid_norm-05-19', function (req, res) {    
    fs.readFile('external/covid_norm-05-19.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

module.exports = routes;