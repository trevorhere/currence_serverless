const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { Status } from '../models'
const TableName =  process.env.CURRENCE_STORIES_TABLE || "CURRENCT_STORIES_TABLE"

const addStatusToStory = async ( status: Status ): Promise<{}>  => {
    const timestamp = new Date().getTime();
    const params = {
        TableName,
        Item: {
            alias: status.alias,
            id: status.id,
            message: status.message,
            picture: status.image,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    return await dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            throw new Error('Couldn\'t create the user.');
        } else {
            return params.Item
        }
    });
}

const getStory = async (alias: string ): Promise<string[]>  => {

    const params = {
        TableName,
        KeyConditionExpression: 'alias = :alias',
        ExpressionAttributeValues: { ':alias': alias} 
    }

    try {
        const data = async () => {
            let data = await dynamoDb.query(params).promise();
            return data;
        } 

        const response = await data();
        return response.Items;

    } catch (err) {
        console.log('ERROR::Data::Story.getStory', err.message);
        throw new Error(err.message);
    }
}

const getStoryWithLimit = async (alias: string, key:  string | null)  => {
    const params: any = {
        TableName,
        KeyConditionExpression: 'alias = :alias',
        ExpressionAttributeValues: { ':alias': alias},
        Limit: 10
    }

    if(key){ 
        console.log('adding key')
        console.log('key: ', key)
        params.ExclusiveStartKey = key;
    }

    try {

            const data = await dynamoDb.query(params).promise();
            return {
                data: data.Items, 
                key: data.LastEvaluatedKey
            }

    } catch (error) {
        console.log('ERROR::Data::STORY.getStoryWithLimit', error.message);
        throw new Error(error.message);
    }
}

export {
    getStory,
    addStatusToStory,
    getStoryWithLimit
}