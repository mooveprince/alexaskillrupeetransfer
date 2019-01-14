var rp = require('request-promise');

//const currencyServiceEndpoint = "https://currencyservice.herokuapp.com/currency";
//const exchangeRateUrl = currencyServiceEndpoint + "/exchangerate?cb=USD_INR";
//const transferRateUrl = currencyServiceEndpoint + "/transferrate/usdinr";

const currencyServiceEndpoint = process.env.CURRENCY_API || "https://vq77lbtv42.execute-api.us-east-1.amazonaws.com/prod";
const exchangeRateUrl = currencyServiceEndpoint + "/getExchangeRate?rateBetween=USD_INR";
const transferRateUrl = currencyServiceEndpoint + "/getTransferRate";

var getExchangeRate = function () {
    var options = {
        uri: exchangeRateUrl,
        json: true
    }

    return rp (options)
        .then (data => {return data})
        .catch (err => {console.log ("Error in calling API " + err.statusCode); return false})
}

var getTransferRateList = function () {
    var options = {
        uri: transferRateUrl,
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
