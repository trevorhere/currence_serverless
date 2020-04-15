import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import FeedService from '../../services/FeedService';

const middy = require('middy');
const { auth } = require('../auth/auth');


const getFeed: APIGatewayProxyHandler = async (event, _context) => {
    try { 
      
      
      // console.log('event: ', event);
      // console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
      const data = event.queryStringParameters;
      const alias = data["alias"];
      const count = parseInt(data["count"])

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const feedService = new FeedService();
    const feed = await feedService.buildFeed(alias, "");

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
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