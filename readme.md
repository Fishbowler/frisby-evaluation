# API Challenge

This API challenge to evaluate some prospective tools for API exploration and automation. This project was my attempt at evaluating the latest Frisby 2 alpha.

## Challenge One - httpbin

Assert that this endpoint redirects you via an HTTP/302 to example.com:

[http://httpbin.org/redirect-to?url=http%3A%2F%2Fexample.com%2F](http://httpbin.org/redirect-to?url=http%3A%2F%2Fexample.com%2F)

Assert that the "Dan" header returned in this response is “awesome”

[http://httpbin.org/response-headers?dan=awesome](http://httpbin.org/response-headers?dan=awesome)

## Challenge Two - Twitter

Assert that the latest @NottsTest tweet: 

* contains the word "pizza"
* contains a user_mention for @rebelrecruiters

[https://dev.twitter.com/rest/reference/get/search/tweets](https://dev.twitter.com/rest/reference/get/search/tweets)

or

[https://dev.twitter.com/rest/reference/get/statuses/user_timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline)

You’ll need to auth via OAuth here. Some tips:

1. Go to [https://apps.twitter.com/](https://apps.twitter.com/) whilst logged in at and make an app (you can use "http://example.com" for your URL)
2. Do OAuth via your tool
3. If your tool doesn’t do OAuth, then read this: [https://dev.twitter.com/oauth/application-only](https://dev.twitter.com/oauth/application-only)

## Challenge Three - JIRA

Assert that the assignee of TTT-1 is George. Authenticate with JIRA via Cookie rather than OAuth.

Useful links:
* [https://docs.atlassian.com/jira/REST/cloud/#api/2/issue-getIssue](https://docs.atlassian.com/jira/REST/cloud/#api/2/issue-getIssue)
* [https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-cookie-based-authentication/](https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-cookie-based-authentication/)

Auth instructions:
1. post credentials as JSON to https://yourdomain.atlassian.net/rest/auth/1/session
2. there'll be set-cookie headers
3. parse and send them with the next request
