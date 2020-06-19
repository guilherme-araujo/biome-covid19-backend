const axios = require('axios');
const dateFormat = require('dateformat');

axios.get('http://localhost:5000/covid19-api/v1/dates')
.then(function(response){
    let dates = response.data;
    let convDateStr = dateFormat(new Date(), "mm-dd");
    dates.push(convDateStr);
    return dates;
}).then(function(newDates){
    params = {
        dates: newDates,
        key: "2ba9d7c0-ab3c-11ea-8b6e-0800200c9a66"
    };
    return axios.post('http://localhost:5000/covid19-api/v1/dates',params);
}).then(function(res) {
    updatedDates = res.data;
    newActiveDate = updatedDates[updatedDates.length-2];
    params = {
        date: newActiveDate,
        key: "2ba9d7c0-ab3c-11ea-8b6e-0800200c9a66"
    };
    return axios.post('http://localhost:5000/covid19-api/v1/active-date',params);
})

console.log(dateFormat(new Date(), "mm-dd"));
