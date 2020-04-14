const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { User, Status } from '../models'
import { RSA_NO_PADDING } from 'constants';
const TableName =  process.env.CURRENCE_FEEDS_TABLE || "CURRENCE_FEEDS_TABLE"

const getFeed = async (alias: string): Promise<string[]>  => {

    const params = {
        TableName,
        KeyConditionExpression: 'ownerAlias = :alias',
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
        console.log('ERROR::Data::Feed.getFeed', err.message);
        throw new Error(err.message);
    }
}

const addStatusToFeed = async ( ownerAlias: string, status: Status ): Promise<{}>  => {
    try{
        const timestamp = new Date().getTime();
        const params = {
            TableName,
            Item: {
                id: uuid.v1(),
                ownerAlias,
                statusId: status.id,
                message: status.message,
                alias: status.alias, 
                picture: status.image,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        };

        const data = async () => {
            let res = await dynamoDb.put(params).promise();
            res;
            return params.Item;
        } 

        const response = await data();
        return response;


    } catch (err) {
        console.log('ERROR::Data::Feed.addStatusToFeed', err.message);
        throw new Error(err.message);
    }

}

const addBulkStatusToFeed = async ( ownerAliases: string[], status: Status ): Promise<{}>  => {
    try{
        console.log('doing bulk write: ', ownerAliases.length);
        const timestamp = new Date().getTime();

        const statuses = [];
        ownerAliases.forEach( ownerAlias => {
            statuses.push({
                PutRequest: {
                    Item: {
                        id: uuid.v1(),
                        ownerAlias,
                        statusId: status.id,
                        message: status.message,
                        alias: status.alias, 
                        picture: status.image,
                        createdAt: timestamp,
                        updatedAt: timestamp,
                    },
                }
            })
        })

        const params = {
            RequestItems: {
                'CURRENCE_FEEDS': statuses
            }
        };

        const data = async () => {
            let res = await dynamoDb.batchWrite(params).promise();
            console.log('batchWrite:', res);
            return res;
        } 

        const response = await data();
        console.log('response: ', response)
        return response;


    } catch (err) {
        console.log('ERROR::Data::Feed.addBulkStatusToFeed', err.message);
        throw new Error(err.message);
    }

}


// const getUsers = async (aliases: string[]): Promise<string[]>  => {

//     let keys = aliases.map( alias => {
//         return { 'alias': alias}
//     })

//     let queryParams = {RequestItems: {}};
//         queryParams.RequestItems[process.env.CURRENCE_USERS_TABLE] = {
//         Keys: keys,
//     };

//     try {
//         const data = async () => {
//             let data = await dynamoDb.batchGet(queryParams).promise();
//             return data;
//         } 

//         const response = await data();
//         return await response.Responses[process.env.CURRENCE_USERS_TABLE];

//     } catch (err) {
//         console.log('ERROR::Data::User.getBulkUsers', err.message);
//         throw new Error(err.message);
//     }
// }


// const updateUserStatuses = async (alias: string, statuses: Status[]): Promise<{}>  => {
//     // console.log('alias in update status: ', alias);
//     // console.log('statuses in update status: ', statuses);


//     const timestamp = new Date().getTime();
//     const params = {
//         TableName: process.env.CURRENCE_USERS_TABLE,
//         Key: {
//             alias: alias
//         },
//         ExpressionAttributeValues: {
//             ':statuses': [...statuses],            
//             ':updatedAt': timestamp,
//         },
//         UpdateExpression: 'SET statuses = :statuses, updatedAt = :updatedAt',
//         ReturnValues: 'ALL_NEW',
//     };

//     return await dynamoDb.update(params, (error, result) => {
//         // handle potential errors
//         if (error) {
//             console.error(error);
//             throw new Error('Couldn\'t update user statuses.');
//         } else {
//             return result.Attributes
//         }
//     });
// }

// const updateUserFollowers = async (alias: string, followers: []): Promise<{}>  => {
//     // console.log('alias in update status: ', alias);
//     // console.log('statuses in update status: ', statuses);

//     const timestamp = new Date().getTime();
//     const params = {
//         TableName: process.env.CURRENCE_USERS_TABLE,
//         Key: {
//             alias: alias
//         },
//         ExpressionAttributeValues: {
//             ':followers': [...followers],            
//             ':updatedAt': timestamp,
//         },
//         UpdateExpression: 'SET followers = :followers, updatedAt = :updatedAt',
//         ReturnValues: 'ALL_NEW',
//     };

//     return await dynamoDb.update(params, (error, result) => {
//         // handle potential errors
//         if (error) {
//             console.error(error);
//             throw new Error('Couldn\'t update user followers.');
//         } else {
//             return result.Attributes
//         }
//     });
// }


// const updateUserFollowing = async (alias: string, following: []): Promise<{}>  => {
//     // console.log('alias in update status: ', alias);
//     // console.log('statuses in update status: ', statuses);


//     const timestamp = new Date().getTime();
//     const params = {
//         TableName: process.env.CURRENCE_USERS_TABLE,
//         Key: {
//             alias: alias
//         },
//         ExpressionAttributeValues: {
//             ':following': [...following],            
//             ':updatedAt': timestamp,
//         },
//         UpdateExpression: 'SET following = :following, updatedAt = :updatedAt',
//         ReturnValues: 'ALL_NEW',
//     };

//     return await dynamoDb.update(params, (error, result) => {
//         // handle potential errors
//         if (error) {
//             console.error(error);
//             throw new Error('Couldn\'t update user following.');
//         } else {
//             return result.Attributes
//         }
//     });
// }




export {
    getFeed,
    addStatusToFeed,
    addBulkStatusToFeed
    // createFeed,
    // updateUserStatuses,
    // updateUserFollowers,
    // updateUserFollowing,
    // getUsers
}