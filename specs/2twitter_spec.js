var frisby = require('frisby');
var HttpsProxyAgent = require('http-proxy-agent');
var secrets = require('../secrets.js');

var consumer_key = secrets.twitter_consumer_key;
var consumer_secret = secrets.twitter_consumer_secret;
var bearer_creds = consumer_key + ':' + consumer_secret;
var bearer_creds_base64 = (new Buffer(bearer_creds).toString('base64'));

var init_auth_header = 'Basic ' + bearer_creds_base64;

frisby.globalSetup({
    request: {
        //agent: new HttpsProxyAgent('http://127.0.0.1:8888')
    }
})

describe('Twitter', function(){
    it('Will auth me', function(done){
        frisby
            .post('https://api.twitter.com/oauth2/token',{
                body: 'grant_type=client_credentials',
                headers:{
                    'Authorization': init_auth_header,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })
            .expect('status', 200)
        .then(function(response){
            let access_token = response._body.access_token;
            let app_auth_header = 'Bearer ' + access_token;
            
            frisby.addExpectHandler('tweetContainsPizza', function(response){
                let tweet = response._body[0];
                expect(tweet.text.toLowerCase()).toContain('pizza')
            });

            frisby
                .get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NottsTest&count=1',{
                    headers:{
                        'Authorization': app_auth_header
                    }
                })
                .expect('status', 200)
                .expect('tweetContainsPizza')
                .expect('jsonContains','?',{
                    "entities": {
                        "user_mentions": [{
                            "screen_name": "rebelrecruiters"
                        }]
                    }
                })
                .done(done)
        })
    });
});