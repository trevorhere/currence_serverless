import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import FeedService from '../../services/FeedService';

const middy = require('middy');
const { auth } = require('../auth/auth');


const getFeedPage: APIGatewayProxyHandler = async (event, _context) => {
    try { 
      
      
      // console.log('event: ', event);
      // console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
      const data = event.queryStringParameters;
      const alias = data["alias"];
      const keyString = data["key"]
      let key = null;
      if(keyString){
        key = JSON.parse(keyString)
      } 

      console.log('data: ',data)
      console.log('type key: ', keyString)
      console.log('type key: ', key)

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const feedService = new FeedService();
    const res = await feedService.buildFeed(alias, key);
    // console.log('res: ', res);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            feed: res.feed,
            key: res.key,
            user: res.user
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


exports.getFeedPage = middy(getFeedPage).use(auth());