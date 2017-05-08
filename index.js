var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

var handlers = {

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
        
    }
}

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};