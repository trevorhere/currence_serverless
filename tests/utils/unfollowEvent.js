const unfollowEvent =  {
    body: '{"alias":"x","followeeAlias":"trevor"}',
    headers: {
      Host: 'localhost:3000',
      Connection: 'keep-alive',
      'Content-Length': '38',
      'Sec-Fetch-Dest': 'empty',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Origin: 'http://localhost:3001',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      Referer: 'http://localhost:3001/following/x',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9'
    },
    httpMethod: 'POST',
    isBase64Encoded: false,
    multiValueHeaders: {
      Host: [ 'localhost:3000' ],
      Connection: [ 'keep-alive' ],
      'Content-Length': [ '38' ],
      'Sec-Fetch-Dest': [ 'empty' ],
      'User-Agent': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
      ],
      'Content-Type': [ 'application/json' ],
      Accept: [ '*/*' ],
      Origin: [ 'http://localhost:3001' ],
      'Sec-Fetch-Site': [ 'same-site' ],
      'Sec-Fetch-Mode': [ 'cors' ],
      Referer: [ 'http://localhost:3001/following/x' ],
      'Accept-Encoding': [ 'gzip, deflate, br' ],
      'Accept-Language': [ 'en-US,en;q=0.9' ]
    },
    multiValueQueryStringParameters: {
      token: [ process.env.TOKEN
      //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGlhcyI6IngiLCJpYXQiOjE1ODQ5MTcxNjAsImV4cCI6MTU4NDkyMDc2MH0.ubjpz8CFKnz7IN6PAdGWQPAXUOSlFCPaTEnoU5bkLEw'
      ]
    },
    path: '/unfollow',
    pathParameters: null,
    queryStringParameters: {
      token: process.env.TOKEN
       // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGlhcyI6IngiLCJpYXQiOjE1ODQ5MTcxNjAsImV4cCI6MTU4NDkyMDc2MH0.ubjpz8CFKnz7IN6PAdGWQPAXUOSlFCPaTEnoU5bkLEw'
    },
    requestContext: {
      accountId: 'offlineContext_accountId',
      apiId: 'offlineContext_apiId',
      authorizer: {
        claims: undefined,
        principalId: 'offlineContext_authorizer_principalId'
      },
      domainName: 'offlineContext_domainName',
      domainPrefix: 'offlineContext_domainPrefix',
      extendedRequestId: 'ck83mysee000iu5whbedc1bqr',
      httpMethod: 'POST',
      identity: {
        accessKey: null,
        accountId: 'offlineContext_accountId',
        apiKey: 'offlineContext_apiKey',
        caller: 'offlineContext_caller',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
        cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
        principalOrgId: null,
        sourceIp: '127.0.0.1',
        user: 'offlineContext_user',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        userArn: 'offlineContext_userArn'
      },
      path: '/dev/unfollow',
      protocol: 'HTTP/1.1',
      requestId: 'ck83mysee000ju5whc8vkhtpe',
      requestTime: '22/Mar/2020:16:51:53 -0600',
      requestTimeEpoch: 1584917513796,
      resourceId: 'offlineContext_resourceId',
      resourcePath: '/unfollow',
      stage: 'dev'
    },
    resource: '/unfollow',
    stageVariables: null
  }

module.exports = unfollowEvent;