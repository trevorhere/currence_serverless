import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
import { User } from '../../models/User'

const AuthService = require('../../services/AuthService');
const UserService = require('../../services/UserService');


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
    const passwordHash = await auth.generateHash(password);
    const user = new User(alias, passwordHash, picture);
    const userService = new UserService();
    const createUserPromise = userService.createUser(user);
    const newUser = await createUserPromise;

    const body =
    {
        message: 'User successfully created.',
        authenticated: true,
        alias,
        token: jwt.sign({alias}, secret, {
            expiresIn: '1h'
        })
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