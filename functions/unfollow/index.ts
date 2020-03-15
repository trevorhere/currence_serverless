import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UserService from '../../services/UserService';

const middy = require('middy');
const { auth } = require('../util/auth');


const unfollow: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = JSON.parse(event.body);
    console.log('INPUT DATA:  ', data);
    const alias = data["alias"];
    const followeeAlias = data["followeeAlias"];


    if(!alias || !followeeAlias){ 
        throw new Error("[400] Bad input data")
    }

    const userService = new UserService();
    const getUserPromise = userService.getUser(alias);
    const getFolloweePromise = userService.getUser(followeeAlias);

    const user = await getUserPromise;
    const followee = await getFolloweePromise;

    user.removeFollowing(followeeAlias);
    followee.removeFollower(alias);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            user
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


exports.unfollow = middy(unfollow).use(auth());