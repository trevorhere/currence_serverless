import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UserService from '../../services/UserService';

export const isValidAlias: APIGatewayProxyHandler = async (event, _context) => {
    try {  

    console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
    const data = event.queryStringParameters;
    const alias = data["alias"];

    if(!alias){ 
        throw new Error("[400] Bad input data")
    }


    let result = true;
    if(!alias.match(/^[a-z]+$/i)) result = false;
    if(alias.length > 50) result = false;

    const userService = new UserService();
    const getUserPromise = userService.getUser(alias);
    const user = await getUserPromise;
    if(user) result = false;
    
    // console.log('user: ', user);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            result
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