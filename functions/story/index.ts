import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const UserService =require('../../services/UserService');


const getStory: APIGatewayProxyHandler = async (event, _context) => {
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
    const story = await user.getStatuses();

    // console.log('story: ', story);
    // console.log('user: ', user);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          user,
          story
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


export {
    getStory
}