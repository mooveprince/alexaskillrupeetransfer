var rp = require('request-promise');

//const currencyServiceEndpoint = "https://currencyservice.herokuapp.com/currency";
//const exchangeRateUrl = currencyServiceEndpoint + "/exchangerate?cb=USD_INR";
//const transferRateUrl = currencyServiceEndpoint + "/transferrate/usdinr";

const currencyServiceEndpoint = process.env.CURRENCY_API || "https://vq77lbtv42.execute-api.us-east-1.amazonaws.com/prod";
const exchangeRateUrl = currencyServiceEndpoint + "/getExchangeRate?rateBetween=";

var getExchangeRate = function (originCountry) {

    var parameter = 'USD_INR';

    switch (originCountry) {
        case 'CANADA':
            parameter = 'CAD_INR';
            break;
        case 'USA':
            parameter = 'USD_INR';
            break;
        default:
        parameter = 'USD_INR';
    }

    var options = {
        uri: `${exchangeRateUrl}${parameter}`,
        json: true
    }

    return rp (options)
        .then (data => {return data})
        .catch (err => {console.log ("Error in calling API " + err.statusCode); return false})
}

var getTransferRateList = function (originCountry) {

    var parameter = '/getTransferRate';

    switch (originCountry) {
        case 'CANADA':
            parameter = '/getCanadaTransferRate';
            break;
        case 'USA':
            parameter = '/getTransferRate';
            break;
        default:
            parameter = '/getTransferRate';
    }

    var options = {
        uri: currencyServiceEndpoint+parameter,
        json: true
    }

    return rp (options)
        .then (data => {return data})
        .catch (err => {console.log ("Error in calling API " + err.statusCode); return false})    
}

module.exports = {
    getExchangeRate : getExchangeRate,
    getTransferRateList : getTransferRateList
}
