const signinEvent = {
    body: '{"alias":"x","password":"x"}',
    headers: {
      Host: 'localhost:3000',
      Connection: 'keep-alive',
      'Content-Length': '28',
      'Sec-Fetch-Dest': 'empty',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Origin: 'http://localhost:3001',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      Referer: 'http://localhost:3001/signin',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9'
    },
    httpMethod: 'POST',
    isBase64Encoded: false,
    multiValueHeaders: {
      Host: [ 'localhost:3000' ],
      Connection: [ 'keep-alive' ],
      'Content-Length': [ '28' ],
      'Sec-Fetch-Dest': [ 'empty' ],
      'User-Agent': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
      ],
      'Content-Type': [ 'application/json' ],
      Accept: [ '*/*' ],
      Origin: [ 'http://localhost:3001' ],
      'Sec-Fetch-Site': [ 'same-site' ],
      'Sec-Fetch-Mode': [ 'cors' ],
      Referer: [ 'http://localhost:3001/signin' ],
      'Accept-Encoding': [ 'gzip, deflate, br' ],
      'Accept-Language': [ 'en-US,en;q=0.9' ]
    },
    multiValueQueryStringParameters: null,
    path: '/signin',
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
      accountId: 'offlineContext_accountId',
      apiId: 'offlineContext_apiId',
      authorizer: {
        claims: undefined,
        principalId: 'offlineContext_authorizer_principalId'
      },
      domainName: 'offlineContext_domainName',
      domainPrefix: 'offlineContext_domainPrefix',
      extendedRequestId: 'ck83m2cmo0000t7whg84p2gg1',
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
      path: '/dev/signin',
      protocol: 'HTTP/1.1',
      requestId: 'ck83m2cmp0001t7whdt6w8ogf',
      requestTime: '22/Mar/2020:16:26:40 -0600',
      requestTimeEpoch: 1584916000363,
      resourceId: 'offlineContext_resourceId',
      resourcePath: '/signin',
      stage: 'dev'
    },
    resource: '/signin',
    stageVariables: null
  }

  module.exports = signinEvent