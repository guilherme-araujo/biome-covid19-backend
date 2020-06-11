const express = require('express');
const fs = require('fs');
var level = require('level')

const routes = express.Router();
var db = level('db')


routes.get('/dates', async function (req, res) {   
    try{
        dates = await db.get('dates');
        res.send(JSON.parse(dates));
        //res.send(JSON.parse(dates));
    } catch(err){
        res.send(err.message);
    } 
});

routes.post('/dates', async function (req, res) {   
    try{
        if(req.body.key !== '2ba9d7c0-ab3c-11ea-8b6e-0800200c9a66') throw new Error('Wrong key');

        await db.put('dates', JSON.stringify(req.body.dates));
        dates = await db.get('dates');
        res.send(JSON.parse(dates));
    } catch(err){
        res.send(err.message);
    } 
});

routes.get('/active-date', async function (req, res) {   
    try{
        date = await db.get('active-date');
        res.send(JSON.parse(date));
        //res.send(JSON.parse(dates));
    } catch(err){
        res.send(err.message);
    } 
});

routes.post('/active-date', async function (req, res) {   
    try{
        if(req.body.key !== '2ba9d7c0-ab3c-11ea-8b6e-0800200c9a66') throw new Error('Wrong key');
        
        await db.put('active-date', JSON.stringify(req.body.date));
        date = await db.get('active-date');
        res.send(JSON.parse(date));
    } catch(err){
        res.send(err.message);
    } 
});

routes.get('/covid_norm/:date?', async function (req, res) {   
    try{
        date = req.params.date ?? JSON.parse(await db.get('active-date'));        
        
        fs.readFile('external/'+date+'/covid_norm-'+date+'.json', 'utf8', function(err, data) {
            if (err) {
                res.send('unavaliable');
            } else {
                res.send(data);
            }
            
        });
    } catch(err){
        res.send(err.message);
    }  
});

routes.get('/covid_norm-plot2/:date?', async function (req, res) {    
    try{
        date = req.params.date ?? JSON.parse(await db.get('active-date'));
        fs.readFile('external/'+date+'/covid_norm-plot2-'+date+'.json', 'utf8', function(err, data) {
            if (err) {
                res.send('unavaliable');
            } else {
                res.send(data);
            }
        });
    } catch(err){
        res.send(err.message);
    }      
});

routes.get('/covid_norm-plot3/:date?', async function (req, res) {    
    try{
        date = req.params.date ?? JSON.parse(await db.get('active-date'));
        fs.readFile('external/'+date+'/covid_norm-plot3-'+date+'.json', 'utf8', function(err, data) {
            if (err) {
                res.send('unavaliable');
            } else {
                res.send(data);
            }
        });
    } catch(err){
        res.send(err.message);
    } 
});

routes.get('/covid_norm-plot4/:date?', async function (req, res) {    
    try{
        date = req.params.date ?? JSON.parse(await db.get('active-date'));
        fs.readFile('external/'+date+'/covid_norm-plot4-'+date+'.json', 'utf8', function(err, data) {
            if (err) {
                res.send('unavaliable');
            } else {
                res.send(data);
            }
        });
    } catch(err){
        res.send(err.message);
    } 
});

routes.get('/covid_norm-06-01', function (req, res) {    
    fs.readFile('external/'+date+'/covid_norm-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot2-06-01', function (req, res) {    
    fs.readFile('external/'+date+'/covid_norm-plot2-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot3-06-01', function (req, res) {    
    fs.readFile('external/'+date+'/covid_norm-plot3-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

routes.get('/covid_norm-plot4-06-01', function (req, res) {    
    fs.readFile('external/'+date+'/covid_norm-plot4-06-01.json', 'utf8', function(err, data) {
        if (err) throw err;
        
        res.send(data);
    });
});

module.exports = routes;