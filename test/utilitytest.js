var expect = require('chai').expect;
var util = require('../utility');

describe ("Testing utility methods", function () {

    describe ("getExchangeRate", function () {

        it ("should return exchange rate from API", function (done) {
            util.getExchangeRate ()
                .then (function (data) {
                    expect (data).not.to.be.null;
                    expect (data.exchangeRate.val).not.to.be.null;
                    done();
            }); 
        })     
    })

    describe ("getTransferRateList", function () {

        it ("should return transfer rate list from API", function (done) {
            util.getTransferRateList ()
                .then (function (data) {
                    expect (data).not.to.be.null;
                    expect (data.exchangeRateList.length).to.be.above(0);
                    done();
                })
        });

    })

})