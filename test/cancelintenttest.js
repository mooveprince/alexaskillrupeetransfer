var expect = require('chai').expect;
var index = require('../index');
 
const context = require('aws-lambda-mock-context');
const ctx = context();

describe ("Testing a session with CancelIntent", function () {

    var speechResponse = null
    var speechError = null

    before (function (done) {
        index.handler ({
            "session": {
                "sessionId": "SessionId.d1ad133c-9b45-4d51-9ba4-1923cbbfeddb",
                "application": {
                "applicationId": "amzn1.ask.skill.b8e70fdd-424d-487d-9357-087b8c237697"
                },
                "attributes": {},
                "user": {
                "userId": "amzn1.ask.account.AGKCB5I7UPC6ICHTCNIF5NVSALRFPTJZ62YLCSCVVJMUZW66YN4B2PUFKIW7H7YC2PDQACGSOQRG6IF7RE3ALSNGXSJEQ2G6R3BXMLGPUV4M6KDPYOVQSYGBOLALBXOHZWU4V3VHLBGM7EYP2FCMZEOSSGLIL6PST2OZWWOPSZN5R7TW3D7TYFE2PDDN54L4IVQ7K67OEUU325A"
                },
                "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.0b028593-938f-4b14-aa8b-8d6561e031a2",
                "locale": "en-US",
                "timestamp": "2017-04-23T02:56:14Z",
                "intent": {
                "name": "AMAZON.CancelIntent",
                "slots": {}
                }
            },
            "version": "1.0"              
        }, ctx);
        
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    });

    describe("The response is structurally correct for Alexa Speech Services", function() {

        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })

        it('should have session attributes', function() {
            expect(speechResponse.response.sessionAttributes).not.to.be.null
        })          

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })

    })    

})