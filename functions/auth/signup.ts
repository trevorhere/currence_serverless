import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
import { User } from '../../models/User'
import { imageUploader } from '../../services/S3'

import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

const signup: APIGatewayProxyHandler = async (event, _context) => {
    try {  


   // console.log('event: ', event);

    const data = JSON.parse(event.body); 
    const alias = data["alias"];
    const password = data["password"];
    const picture = data["picture"];


    // console.log('INPUT DATA:  ', data);
    // console.log('ALIAS:  ', alias);

    if(!password || !alias){
        throw new Error("[400] Bad input data")
    }

    const auth = new AuthService();
    const passwordHash = await auth.generateHash(password);
    const user = new User(alias, passwordHash, picture);
    const userService = new UserService();
    const createUserPromise = userService.createUser(user);
    const newUser = await createUserPromise;
    console.log('newUser: ', newUser);
    newUser;
    imageUploader(picture, alias);


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

export {
    signup
}