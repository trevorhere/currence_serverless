const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { User, Status } from '../models'
const TableName =  process.env.CURRENCE_STORIES_TABLE || "CURRENCT_STORIES_TABLE"

// const getStory = async ( alias: string ): Promise<{}>  => {
//     try {

//         const params = {
//             TableName,
//             Key: {
//                 alias
//             },
//         };

//         const data = async () => {
//             let story = await dynamoDb.get(params).promise();
//             // console.log('get user in getuser: ', user);
//             return story;
//         } 

//         const { Item } = await data();
//         return Item;
//     } catch (err) {
//         console.log('ERROR::DATA::Story.getStory ', err.message);
//         throw new Error(err.message);
//     }
// }

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

const getStory = async (alias: string): Promise<string[]>  => {

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
    getStory,
    addStatusToStory
    // updateUserStatuses,
    // updateUserFollowers,
    // updateUserFollowing,
    // getUsers
}