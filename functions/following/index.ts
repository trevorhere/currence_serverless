import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UserService from '../../services/UserService';

const middy = require('middy');
const { auth } = require('../auth/auth');


const getFollowing: APIGatewayProxyHandler = async (event, _context) => {
    try {  

        const alias = event.pathParameters.alias || ""
        const cursor = event.pathParameters.cursor || ""
    
        console.log('INPUT QUERY PARAMS:  ', alias, cursor);
    
        let key = null;
    
        if(cursor && cursor !== "none"){
            key = {followerAlias: alias, followeeAlias: cursor}
        }
    
        console.log("key: ", key)

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const userService = new UserService();
    const getFollowingPromise = userService.getFollowing(alias, key);
    const res = await getFollowingPromise;
    console.log('res in index service', res);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            following: res.following,
            key: res.key
        }),
    };


    } catch(error){
        console.log('FOLLOWING::ERROR: ', error.message);
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