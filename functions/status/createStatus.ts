import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import StatusService from '../../services/StatusService';

const middy = require('middy');
const { auth } = require('../auth/auth');


const createStatus: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    const data = JSON.parse(event.body);
    console.log('INPUT DATA:  ', data);
    const alias = data["alias"];
    const message = data["message"];

    if(!alias || !message){ 
        throw new Error("[400] Bad input data")
    }

    const statusService = new StatusService();
    const createStatusPromise = statusService.createStatus(alias, message);
    const status = await createStatusPromise;


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            status
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


exports.createStatus = middy(createStatus).use(auth());