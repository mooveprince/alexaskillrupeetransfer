var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

var skillName = "Rupee Transfer";

var handlers = {

    "GetTransferRate" : function () {
        console.log ("Get the transfer rate")
        console.log ("Event intent " + JSON.stringify(this.event.request.intent));
        var exchangeResult = Utility.getExchangeRate();
        exchangeResult.then(data => {
            var exchangeRate = data.exchangeRate;
            console.log ("Current Exchange rate is " + exchangeRate);
            var transferRate = [];
            var includePause = "<break time='1s'/>";

            var transferResult = Utility.getTransferRateList();
            transferResult.then(dataList => {
                for (i=0; i<3; i++){    //get only top three agencies
                    transferRate.push(dataList.exchangeRateList[i]);
                }
            
            console.log ("Length of pushed data " + transferRate.length);
            var speechText = `Current exchange rate to India is ${exchangeRate} Rupees. ${includePause}`;
            speechText += `The best rate is offered by ${transferRate[0].agencyName}. Which is ${transferRate[0].exchangeRate} Rupees. ${includePause}`;
            speechText += `Next best is offered by ${transferRate[1].agencyName}. Which is ${transferRate[1].exchangeRate} Rupees. ${includePause}`;
            speechText += `Third best rate is offered by ${transferRate[2].agencyName}. Which is ${transferRate[2].exchangeRate} Rupees. ${includePause}`;
            
            var cardText = `1 USD = ${exchangeRate} Rupees. \n`;
            cardText += `${transferRate[0].agencyName} Offers ${transferRate[0].exchangeRate} \n`
            cardText += `${transferRate[1].agencyName} Offers ${transferRate[1].exchangeRate} AND \n`
            cardText += `${transferRate[2].agencyName} Offers ${transferRate[2].exchangeRate}. \n`

            this.emit(':tellWithCard', speechText, 'Best Transfer Rate', cardText);
            });
        });
    },

    "LaunchRequest" : function () {
        var speechText = `Welcome to ${skillName}. Get the best exchange rate when you transfer money to India`;
        var repromptText = `For instructions on what you can say, please say help me.`;

        this.emit(':ask', speechText, repromptText);
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
        speechText += " What's the best money transfer agency ?";
        speechText += " What's' the transfer rate ? ";
        speechText += " What's the current transfer rate ?";

        this.emit(':ask', speechText, speechText);  
    },

    "Unhandled" : function () {
        var speechText = `Sorry, I didn\'t get that.`;
        var repromptText = `For instructions on what you can say, please say help me.`;

        console.log ("Something broken");

        this.emit(':ask', speechText, repromptText);

    }    
}

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};