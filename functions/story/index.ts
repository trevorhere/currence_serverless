import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import StatusService from '../../services/StatusService';

const getStory: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    // console.log('INPUT QUERY PARAMS:  ', event);
    const alias = event.pathParameters.alias || ""
    const cursor = event.pathParameters.cursor || ""
    console.log('INPUT QUERY PARAMS:  ', alias, cursor);
    
    let key = null;

    if(cursor && cursor !== "none"){
      key = {id: cursor, alias}
    }

    console.log("key: ", key)


    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const statusService = new StatusService();
    const res  = await statusService.buildStory(alias, key);
    // console.log('res: ', res);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          story: res.story,
          key: res.key,
          user: res.user
          }),
    };


    } catch(error){
    console.log('STORY::ERROR: ', error.message);
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


export {
    getStory
}