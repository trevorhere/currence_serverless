import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const UserService =require('../../services/UserService');

const middy = require('middy');
const { auth } = require('../auth/auth');


const getFollowers: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
    const data = event.queryStringParameters;
    const alias = data["alias"];

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const userService = new UserService();
    const getUserPromise = userService.getUser(alias);
    const user = await getUserPromise;
    const followersAliases = [...user.followers];


    const userLookup = async (alias:string) => {
        return await userService.getUser(alias);
    }

    const buildFollowers = async () => {
        return Promise.all( followersAliases.map( a => userLookup(a)));
    }

    let followers = await buildFollowers().then(f => {
        console.log('followers: ', f);
        return [...f];
    })

    console.log('followers: ', followers);
    // console.log('user: ', user);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            user,
            followers
        }),
    };


    } catch(error){
        console.log('FEED::ERROR: ', error.message);
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


exports.getFollowers = middy(getFollowers).use(auth());