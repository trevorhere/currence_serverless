import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const AuthService = require('../../services/AuthService');
const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');


export const signin: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = event.body; 
    const alias = data["alias"];
    const password = data["password"];

    console.log('INPUT DATA:  ', data);

    if(!password || !alias)
        throw new Error("[400] Bad input data")
    
    
    const auth = new AuthService();
    const authenticatedPromise =  auth.signin(alias, password);
    const authenticated = await authenticatedPromise;

    console.log("Authenticated: ", authenticated);

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
        authenticated,
        alias,
        token: null
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
        statusCode:(error.message.includes("400"))? 400 : 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
            body: JSON.stringify({
            message: error.message,
            input: event
        }),
    };
    }
}