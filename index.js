var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

var handlers = {

    "GetTransferRate" : function () {

        var exchangeResult = Utility.getExchangeRate();
        exchangeResult.then(data => {
            var exchangeRate = data.exchangeRate.val;
            var transferRate = [];
            var includePause = "<break time='1s'/>";

            var transferResult = Utility.getTransferRateList();
            transferResult.then(dataList => {
                for (i=0; i<3; i++){    //get only top three agencies
                    transferRate.push(dataList.exchangeRateList[i]);
                }
            var speechText = `Current exchange rate to India is ${exchangeRate} Rupees. ${includePause}`;
            speechText += `The best rate is offered by ${transferRate[0].agencyName}. Which is ${transferRate[0].exchangeRate} ${includePause}`;
            speechText += `Next best is offered by ${transferRate[1].agencyName}. Which is ${transferRate[1].exchangeRate} ${includePause}`;
            speechText += `Third best rate is offered by ${transferRate[2].agencyName}. Which is ${transferRate[2].exchangeRate} ${includePause}`;
            
            var cardText = `1 USD = ${exchangeRate} Rupees. \n`;
            cardText += `${transferRate[0].agencyName} Offers ${transferRate[0].exchangeRate} \n`
            cardText += `${transferRate[1].agencyName} Offers ${transferRate[1].exchangeRate} AND \n`
            cardText += `${transferRate[2].agencyName} Offers ${transferRate[2].exchangeRate}. \n`

            this.emit(':tellWithCard', speechText, 'Best Transfer Rate', cardText);
            });
        });


    },

    "AMAZON.StopIntent": function () {
        var speechText = "Goodbye";
        this.emit(':tell', speechText);
    },
 
    "AMAZON.CancelIntent": function () {
        var speechText = "Goodbye";
        this.emit(':tell', speechText);
    },

    "AMAZON.HelpIntent" : function () {
        var speechText = "Here are somethings you can say: ";
        speechText += " The best agency";
        speechText += " What's' the transfer rate ? ";
        speechText += " The best transfer rate ?";

        this.emit(':ask', speechText, speechText);  
    },

    "Unhandled" : function () {
        var speechText = `Sorry, I didn\'t get that.`;
        var repromptText = `For instructions on what you can say, please say help me.`;

        this.emit(':ask', speechText, repromptText);

    }    
}

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};