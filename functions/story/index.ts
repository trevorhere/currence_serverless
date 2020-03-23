import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import StatusService from '../../services/StatusService';

const getStory: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    // console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
    const data = event.queryStringParameters;
    const alias = data["alias"];

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }

    const statusService = new StatusService();
    const story = await statusService.buildStory(alias);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          story
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