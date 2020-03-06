import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  
  const username = 'trevor';
  const password = 'password';
  let authenticated = true;

  console.log('alias: ', event['body']['alias']);
  console.log('password: ', event['body']['password']);


   if(event["alias"] != username) authenticated = false;
   if(event["password"] != password) authenticated = false;

   const body = authenticated ? 
     {
      message: 'User successfully authenticated.',
      authenticated
    } : {
      message: 'Unable to authenticate user.',
      authenticated
    }
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({...body}, null, 2),
  };
}

export const signin: APIGatewayProxyHandler = async (event, _context) => {




  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      alias: 'trevor',
      password: 'password',
      input: event,
    }, null, 2),
  };
}
