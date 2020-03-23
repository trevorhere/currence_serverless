import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UtilService from '../../services/UtilService'


export const isFollowing: APIGatewayProxyHandler = async (event, _context) => {
    try {  


    // console.log('INPUT QUERY PARAMS:  ', event.queryStringParameters);
    const data = event.queryStringParameters;
    const alias = data["alias"];
    const followeeAlias = data["followeeAlias"];

    if(!alias || !followeeAlias)
        throw new Error("[400] Bad input data")

    const utilService = new UtilService();
    let result = await utilService.isFollowing(alias, followeeAlias);

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
        console.log('ISFOLLOWING::ERROR: ', error.message);
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
