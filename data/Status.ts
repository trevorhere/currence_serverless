const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { Status } from '../models';

const getStatus = async (id: string): Promise<{}>  => {
    const params = {
        TableName: process.env.CURRENCE_STATUSES_TABLE,
        Key: {
            id
        },
    };
    try {
        const data = async () => {
            let user = await dynamoDb.get(params).promise();
            console.log('get status in get status: ', user);
            return user;
        } 

        const { Item } = await data();
        return Item;
    } catch (err) {
        console.log('ERROR:getStatus: ', err.message);
        throw new Error(err.message);
    }
}

const getStatuses = async (statuses: string[], alias: string): Promise<string[]>  => {

    let keys = statuses.map( status => {
        return { 'id': status, 'alias': alias}
    })


    let queryParams = {RequestItems: {}};
        queryParams.RequestItems[process.env.CURRENCE_STATUSES_TABLE] = {
        Keys: keys,
    };

    try {
        const data = async () => {
            let data = await dynamoDb.batchGet(queryParams).promise();
            return data;
        } 

        const response = await data();
        return await response.Responses[process.env.CURRENCE_STATUSES_TABLE];

    } catch (err) {
        console.log('ERROR::Data::Status.getStatuses:', err.message);
        throw new Error(err.message);
    }
}

const createStatus = async (status: Status): Promise<{}>  => {
    try {

        const timestamp = new Date().getTime();
        const params = {
            TableName: process.env.CURRENCE_STATUSES_TABLE,
            Item: {
                id: status.id,
                alias: status.alias,
                message: status.message,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
            ReturnValues: "ALL_OLD", 
        };

        const data = async () => {
            let status = await dynamoDb.put(params).promise();
            return params.Item;
        } 

        return await data();

    } catch (err) {
        console.log('ERROR::DATA::Status.createStatus ', err.message);
        throw new Error(err.message);
    }
}


export {
    getStatus,
    createStatus,
    getStatuses
}




