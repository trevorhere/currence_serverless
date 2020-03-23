const getFollowersEvent = {
    body: null,
    headers: {
      Host: 'localhost:3000',
      Connection: 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Origin: 'http://localhost:3001',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      Referer: 'http://localhost:3001/followers/x',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9'
    },
    httpMethod: 'GET',
    isBase64Encoded: false,
    multiValueHeaders: {
      Host: [ 'localhost:3000' ],
      Connection: [ 'keep-alive' ],
      'Sec-Fetch-Dest': [ 'empty' ],
      'User-Agent': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
      ],
      'Content-Type': [ 'application/json' ],
      Accept: [ '*/*' ],
      Origin: [ 'http://localhost:3001' ],
      'Sec-Fetch-Site': [ 'same-site' ],
      'Sec-Fetch-Mode': [ 'cors' ],
      Referer: [ 'http://localhost:3001/followers/x' ],
      'Accept-Encoding': [ 'gzip, deflate, br' ],
      'Accept-Language': [ 'en-US,en;q=0.9' ]
    },
    multiValueQueryStringParameters: {
      alias: [ 'x' ],
      token: [
        process.env.TOKEN
       // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGlhcyI6IngiLCJpYXQiOjE1ODQ5MTcxNjAsImV4cCI6MTU4NDkyMDc2MH0.ubjpz8CFKnz7IN6PAdGWQPAXUOSlFCPaTEnoU5bkLEw'
      ]
    },
    path: '/followers',
    pathParameters: null,
    queryStringParameters: {
      alias: 'x',
      token: 
      process.env.TOKEN
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
      extendedRequestId: 'ck83ns3vh000027wh8qpu06ss',
      httpMethod: 'GET',
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
      path: '/dev/followers',
      protocol: 'HTTP/1.1',
      requestId: 'ck83ns3vh000127whdpyu8arq',
      requestTime: '22/Mar/2020:17:14:41 -0600',
      requestTimeEpoch: 1584918881689,
      resourceId: 'offlineContext_resourceId',
      resourcePath: '/followers',
      stage: 'dev'
    },
    resource: '/followers',
    stageVariables: null
  }

  module.exports = getFollowersEvent