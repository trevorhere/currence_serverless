import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const SigninService = require('./SigninService');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');


export const signin: APIGatewayProxyHandler = async (event, _context) => {
  try {  

    const data = JSON.parse(event.body); 
    const alias = data["alias"];
    const password = data["password"];

    console.log('INPUT DATA:  ', data);
    console.log('INPUT Alias:  ', alias);
    console.log('INPUT Password:  ', password);



    try {
      if(!password || !alias){ 
        throw new Error("bad input data")
      }
    } catch(error){
      console.log('SIGNIN::ERROR: ', error.message);
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: "ERROR::SIGNIN invalid request parameters!"}, null, 2),
      };
    }

  
    const signinService = new SigninService();
    const authenticatedPromise =  signinService.signin(alias, password);
    const authenticated = await authenticatedPromise;


    const body = authenticated ? 
      {
        message: 'User successfully authenticated.',
        authenticated,
        alias,
        token: jwt.sign({alias}, secret, {
          expiresIn: '1h'
        })
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


  } catch(error){
    console.log('SIGNIN::ERROR: ', error.message);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: "ERROR::SIGNIN Serve could not process request!"}, null, 2),
    };
  }
}
  