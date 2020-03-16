const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

import { seedDB, getUsers, addUser } from '../db/index'
import { User } from '../models';


const getUser = async (alias: string): Promise<{}>  => {
    seedDB();

    const userPromise =  getUsers().find(user =>  user["alias"] == alias)
    const user = await userPromise;
    // console.log('querying user from db: ', user);
    return  user;
}

const createUser = async (alias: string, password: string, picture: string): Promise<{}>  => {

    // seedDB();

    const timestamp = new Date().getTime();
    const user = new User(alias, alias, alias, password, picture);
    addUser(user);
 
    console.log('table name: ', process.env.CURRENCE_USERS_TABLE)

    const params = {
        TableName: process.env.CURRENCE_USERS_TABLE,
        Item: {
            id: uuid.v1(),
            alias,
            password,
            picture,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            throw new Error('Couldn\'t create the user.');
        }
    });
        

    return params.Item;
}

export {
    getUser,
    createUser
}


