import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const addStatusToFeed: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    console.log('test function hit');

    console.log('INPUT QUERY PARAMS:  ', event);
    

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            result: "success"
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