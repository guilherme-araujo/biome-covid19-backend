const fs = require('fs');
const dateFormat = require('dateformat');
const csv = require('csv-parser');

const obj = JSON.parse(fs.readFileSync('owid-covid-data.json','utf-8'));

//----------------------------------
//-----cumulativo.csv file-----
//----------------------------------
let country_list = [
    {code:"AUS", name: "Australia"},
    {code:"BEL", name: "Belgium"},
    {code:"BRA", name: "Brazil"},
    {code:"CHN", name: "China"},
    {code:"IRN", name: "Iran"},
    {code:"ITA", name: "Italy"},
    {code:"ZAF", name: "South Africa"},
    {code:"ESP", name: "Spain"},
    {code:"GBR", name: "United Kingdom"},
    {code:"USA", name: "United States"},
];

let confirmed_history = {
    "BEL" : {},
    "ITA" : {},
    "USA" : {},
    "GBR" : {}
};

writeStr="country,code,date,cumulative,confirmed\n";

for(let country of country_list){
    for (let l in obj[country["code"]]["data"]){        
        let line = obj[country["code"]]["data"][l];
        let convDate = new Date(line['date']);
        let year = dateFormat(convDate,'yyyy');
        if(confirmed_history[country["code"]]){
            confirmed_history[country["code"]][convDate] = {new: line['new_cases'], total: line['total_cases']};
        }
        if(year==='2020' && line['total_cases'] && line['new_cases'] ){
            convDateStr = dateFormat(convDate, "dd/mm/yyyy");
            newLine = country["name"]+","+country["code"]+","+convDateStr+','+line['total_cases']+','+line['new_cases'];
            writeStr += newLine+"\n";
        }  
    }
}

fs.writeFileSync('cumulativo.csv',writeStr,'utf8');

//----------------------------------
//-------deaths.csv file-------
//----------------------------------
let country_list2 = [
    {code:"AUS", name: "Australia"},
    {code:"BEL", name: "Belgium"},
    {code:"BRA", name: "Brazil"},
    {code:"CHN", name: "China"},
    {code:"IRN", name: "Iran"},
    {code:"ITA", name: "Italy"},
    {code:"ESP", name: "Spain"},
    {code:"GBR", name: "United Kingdom"},
    {code:"USA", name: "United States"},
];

writeStr="country,code,date,total,daily\n";

for(let country of country_list2){
    for (let l in obj[country["code"]]["data"]){
        let line = obj[country["code"]]["data"][l];
        let convDate = new Date(line['date']);
        let year = dateFormat(convDate,'yyyy');
        if(year==='2020' && line['total_deaths'] && line['new_deaths']){
            convDateStr = dateFormat(convDate, "dd/mm/yyyy");
            newLine = country["name"]+","+country["code"]+","+convDateStr+','+line['total_deaths']+','+line['new_deaths'];
            writeStr += newLine+"\n";
        }
    }
}

fs.writeFileSync('deaths.csv',writeStr,'utf8');

//-----------------------------------
//--covid-normalizado.csv file--
//-----------------------------------
const countryList3 = [
    {csv_str: 'United States - units unclear', name: 'USA', code: 'USA', cutoffDate: new Date('2020-03-07')},
    {csv_str: 'Italy - tests performed', name: 'Italy', code: 'ITA', cutoffDate: new Date('2020-02-27')},
    {csv_str: 'United Kingdom', name: 'UK', code: 'GBR', cutoffDate: new Date('2020-02-27')},
    {csv_str: 'Belgium - units unclear', name: 'Belgium', code: 'BEL', cutoffDate: new Date('2020-03-01')}
];

let rollingAvg = {};

countryList3.forEach((country) => {
    avgs = {
        day1: 0,
        day2: 0,
        day3: 0
    }
    rollingAvg[country['code']] = avgs;
})

function readAllLines (){
    return new Promise(function(resolve, reject){
        let writeStr="country,date,confirmed,tests ,cases/100 tests,media2days,media3days,cumulative\n";
        fs.createReadStream('covid-testing-all-observations.csv')
        .pipe(csv())
        .on('data', function (row) {
            for (country of countryList3){                  
                if(row['Entity'].includes(country.csv_str)){                    
                    let convDate = new Date(row['Date']);
                    if(country.cutoffDate>convDate) continue;
                    let new_tests = row['Daily change in cumulative total'] || 0                 
                    let new_cases = confirmed_history[country.code][convDate]['new'];
                    let total_cases = confirmed_history[country.code][convDate]['total'];
                    let convDateStr = dateFormat(convDate, "dd/mm/yyyy");
                    let cases100tests = (new_cases*100)/new_tests
                    cases100tests = Number.isFinite(cases100tests) ? cases100tests : 0 ;
                    rollingAvg[country.code].day1 = rollingAvg[country.code].day2;
                    rollingAvg[country.code].day2 = rollingAvg[country.code].day3;
                    rollingAvg[country.code].day3 = cases100tests;
                    let media2days = (rollingAvg[country.code].day2 + rollingAvg[country.code].day3)/2;
                    let media3days = (rollingAvg[country.code].day1 + rollingAvg[country.code].day2 + rollingAvg[country.code].day3)/3;
                    let newline = `${country.name},${convDateStr},${new_cases},${new_tests},${cases100tests},${media2days},${media3days},${total_cases}\n`;
                    writeStr += newline;
                }
            }

        })
        .on('end', () => resolve(writeStr))
        .on('error', reject);
    })
}

readAllLines().then((writeStr) => {
    fs.writeFileSync('covid-normalizado.csv',writeStr,'utf8');
})
