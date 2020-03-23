import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import StatusService from '../../services/StatusService';

const middy = require('middy');
const { auth } = require('../auth/auth');

const createStatus: APIGatewayProxyHandler = async (event, _context) => {
    try {  

       // console.log('event: ', event);

    const data = JSON.parse(event.body);
    // console.log('INPUT DATA:  ', data);
    const alias = data["alias"];
    const message = data["message"];
   //  console.log('INPUT MESSAGE:  ', message);


    if(!alias || !message){ 
        throw new Error("[400] Bad input data")
    }

    const statusService = new StatusService();
    const status = await statusService.createStatus(alias, message);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            message: "status successfully created",
            status
        }),
    };


    } catch(error){
        console.log('STATUS::ERROR: ', error.message);
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