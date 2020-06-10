var level = require('level')

// 1) Create our database, supply location and options.
//    This will create or open the underlying store.
var db = level('../../db')

function dberr(err) {
    if (err) return console.log('Ooops!', err)
}

db.get('active-date', function (err, value) {
    if (err) return dberr(err)

    console.log(value)
})

db.get('dates', function (err, value) {
    if (err) return dberr(err)

    console.log(value)
})
