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