import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UserService from '../../services/UserService';

const middy = require('middy');
const { auth } = require('../util/auth');


const getFollowing: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = JSON.parse(event.body);
    console.log('INPUT DATA:  ', data);
    const alias = data["alias"];

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const userService = new UserService();
    const getUserPromise = userService.getUser(alias);
    const user = await getUserPromise;
    const followingAliases = await user.getFollowing();


    const userLookup = async (alias:string) => {
        return await userService.getUser(alias);
    }

    const buildFollowing = async () => {
        return Promise.all( followingAliases.map( a => userLookup(a)));
    }

    let following = await buildFollowing().then(f => {
        console.log('following: ', f);
        return [...f];
    })

    console.log('following: ', following);
    // console.log('user: ', user);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            user,
            following
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


exports.getFollowing = middy(getFollowing).use(auth());