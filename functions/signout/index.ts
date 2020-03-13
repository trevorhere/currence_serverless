import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const signout: APIGatewayProxyHandler = async (event, _context) => {
  
    const username = 'trevor';
    const password = 'password';
    let authenticated = true;
  
    const data = JSON.parse(event.body);
  
    if(data["alias"] != username) authenticated = false;
    if(data["password"] != password) authenticated = false;

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
  