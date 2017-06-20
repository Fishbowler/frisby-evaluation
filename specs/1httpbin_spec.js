var frisby = require('frisby');
var HttpsProxyAgent = require('http-proxy-agent');

frisby.globalSetup({
    request: {
        //agent: new HttpsProxyAgent('http://127.0.0.1:8888'),
        redirect: 'manual'
    }
})

describe('httpbin', function(){
    it('will redirect me', function(done){
        frisby
            .setup({request: {redirect: 'manual'}})
            .get('http://httpbin.org/redirect-to?url=http%3A%2F%2Fexample.com%2F')
            .expect('status',302)
            .done(done)
    })
    it('will have an awesome dan', function(done){
        frisby
            .get('http://httpbin.org/response-headers?dan=awesome')
            .expect('header','Dan')
            .done(done)
    })
})