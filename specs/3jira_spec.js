var frisby = require('frisby');
var HttpsProxyAgent = require('http-proxy-agent');
var secrets = require('../secrets.js');

frisby.globalSetup({
    request: {
        //agent: new HttpsProxyAgent('http://127.0.0.1:8888')
    }
})

var jira_root = 'https://' + secrets.jira_domain + '.atlassian.net';
var jira_auth_url = jira_root + '/rest/auth/1/session';
var jira_ticket_url = jira_root + '/rest/api/2/issue/TTT-1';

describe('JIRA',function(){
    it('TTT-1 will be assigned to George',function(done){
        frisby
            .post(jira_auth_url,{
                body: {
                    username: secrets.jira_username,
                    password: secrets.jira_password
                },
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            .expect('status', 200)
            .then(function(response){
                var setCookie = response._response.headers._headers['set-cookie']
                var cookie = ''

                if (Array.isArray(setCookie)) {
                    for (var i = 0, len = setCookie.length; i < len; i++) {
                        cookie += setCookie[i].split(';')[0]
                        if (i < len - 1)
                            cookie += '; '
                    }
                }
                
                frisby
                    .get(jira_ticket_url,{
                        headers: {
                            'Cookie': cookie,
                            "Content-Type" : "application/json"
                        }
                    })
                    .expect('status',200)
                    .expect('jsonContains','fields.assignee',{name:secrets.jira_assignee})
                    .done(done)
            })
            

    })
})
