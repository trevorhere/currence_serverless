import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const AuthService = require('../../services/AuthService');
const UserService = require('../../services/UserService');


const secret = 'mysecretsshhh';
const jwt = require('jsonwebtoken');


export const signup: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = JSON.parse(event.body); 
    const alias = data["alias"];
    const password = data["password"];
    const picture = data["picture"];


    console.log('INPUT DATA:  ', data);
    console.log('ALIAS:  ', alias);
    console.log('PASSWORD:  ', password);

    if(!password || !alias){
        throw new Error("[400] Bad input data")
    }

    const auth = new AuthService();
    const userService = new UserService();
    const passwordHash = auth.generateHash(password);
    const createUserPromise = userService.createUser(alias, passwordHash, picture);
    const user = await createUserPromise;
    user;



    const authenticatedPromise =  auth.signin(alias, password);
    const authenticated = await authenticatedPromise;

    console.log("Authenticated: ", authenticated);

    const body = authenticated ? 
    {
        message: 'User successfully created.',
        authenticated,
        alias,
        token: jwt.sign({alias}, secret, {
            expiresIn: '1h'
        })
    } : {
        message: 'Unable to create user.',
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