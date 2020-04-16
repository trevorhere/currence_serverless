import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import FeedService from '../../services/FeedService';

const middy = require('middy');
const { auth } = require('../auth/auth');


const getFeedPage: APIGatewayProxyHandler = async (event, _context) => {
    try { 
      
      
      const alias = event.pathParameters.alias || ""
      const cursor = event.pathParameters.cursor || ""

      console.log('INPUT QUERY PARAMS:  ', alias, cursor);

      let key = null;

      if(cursor && cursor !== "none"){
        key = {id: cursor, ownerAlias: alias}
      }
  
      console.log("key: ", key)
  
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