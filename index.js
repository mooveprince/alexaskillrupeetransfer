var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

var handlers = {

    "GetTransferRate" : function () {

        var exchangeResult = Utility.getExchangeRate();
        exchangeResult.then(data => {
            var exchangeRate = data.exchangeRate.val;
            var transferRate = [];

            var transferResult = Utility.getTransferRateList();
            transferResult.then(dataList => {
                for (i=0; i<3; i++){    //get only top three agencies
                    transferRate.push(dataList.exchangeRateList[i]);
                }
            var speechText = `Empty Speech for Now`;
            var cardText = `Empty Card For now`;
            this.emit(':tellWithCard', speechText, 'Transfer Rate', cardText);
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
        speechText += " What's' today's transfer rate ? ";
        speechText += " Current news in Tech Crunch.";
        speechText += " Trending topics in Tech Meme";

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