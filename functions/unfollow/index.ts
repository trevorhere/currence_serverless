import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const UserService =require('../../services/UserService');

const middy = require('middy');
const { auth } = require('../auth/auth');


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
    let user  = await userService.unfollow(alias, followeeAlias)


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
    console.log('UNFOLLOW::ERROR: ', error.message);
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