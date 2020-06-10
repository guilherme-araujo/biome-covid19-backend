var level = require('level')

// 1) Create our database, supply location and options.
//    This will create or open the underlying store.
var db = level('../../db')

function dberr(err) {
    if (err) return console.log('Ooops!', err)
}

dates = [
    '05-04',
    '05-19',
    '06-01'
]

// 2) Put a key & value
db.put('dates', JSON.stringify(dates), dberr);
db.put('active-date', JSON.stringify('06-01'), dberr);
