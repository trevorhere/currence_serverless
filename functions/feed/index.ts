import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const UserService =require('../../services/UserService');
import StatusService from '../../services/StatusService';


const middy = require('middy');
const { auth } = require('../auth/auth');


const getFeed: APIGatewayProxyHandler = async (event, _context) => {
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

    const statusService = new StatusService();
    const feed = await statusService.buildFeed(alias);


    // console.log('user in get feed: ', user);
    // const feed = [...user?.feed];
      
    console.log('feed: ', feed);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          user,
          feed
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


exports.getFeed = middy(getFeed).use(auth());