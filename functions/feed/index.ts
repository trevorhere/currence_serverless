import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import FeedService from '../../services/FeedService';
const middy = require('middy');
const { auth } = require('../util/auth');


const getFeed: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = event.body;
    console.log('INPUT DATA:  ', data);
    const alias = data["alias"];

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const feedService = new FeedService();
    const getFeedPromise =  feedService.getFeed(alias);
    const feed = await getFeedPromise;
    console.log('feed: ', feed);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({res:true}, null, 2),
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