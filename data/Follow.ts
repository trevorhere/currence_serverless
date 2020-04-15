const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { User } from '../models'
const TableName =  process.env.CURRENCE_FOLLOWS_TABLE || "CURRENCT_FOLLOWS__TEST_2"

const addFollow = async ( followee: User, follower: User ): Promise<{}>  => {
    const timestamp = new Date().getTime();
    const params = {
        TableName,
        Item: {
            id: uuid.v4(),
            followeeAlias: followee.alias,
            followeePicture: followee.picture,
            followerAlias: follower.alias,
            followerPicture: follower.picture,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    return await dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.log('ERROR::Data::Followers.addFollow', error.message);
            throw new Error(error.message);
        } else {
            return params.Item
        }
    });
}

const removeFollow = async ( followeeAlias: string, followerAlias: string ): Promise<{}>  => {
    console.log('followeeAlias: ', followeeAlias);
    console.log('followerAlias: ', followerAlias);


    console.log('removeFollow hit')
    try {
    const params = {
        TableName,
        Key:{
            "followeeAlias": followeeAlias,
            "followerAlias": followerAlias
        },
    };

    // const params = {
    //     TableName,
    //     Item: {
    //         id: uuid.v4(),
    //         followeeAlias: followee.alias,
    //         followeePicture: followee.picture,
    //         followerAlias: follower.alias,
    //         followerPicture: follower.picture,
    //         createdAt: timestamp,
    //         updatedAt: timestamp,
    //     },
    // };

    let data =  await dynamoDb.delete(params).promise();
    console.log('result: ', data)
    return data;

    } catch (error) {
        console.log('ERROR::Data::Follow.removeFollow', error.message);
        throw new Error(error.message);
    }
}

const getFollowers = async (alias: string, key: string | null) => {

    const params: any = {
        TableName,
        KeyConditionExpression: 'followeeAlias = :followeeAlias',
        ExpressionAttributeValues: { ':followeeAlias': alias},
        Limit: 10
    }

    if(key){ 
        console.log('adding key')
        console.log('key: ', key)
        params.ExclusiveStartKey = key;
    }

    try {
        let data = await dynamoDb.query(params).promise();
        return {
            followers: data.Items, 
            key: data.LastEvaluatedKey
        } 
    } catch (error) {
        console.log('ERROR::Data::Followers.getFollowers', error.message);
        throw new Error(error.message);
    }
}

const isFollowing = async (followerAlias: string, followeeAlias: string, id: string) => {

    console.log('id: ', id)
    const params: any = {
        TableName,
        KeyConditionExpression: 'followeeAlias = :followeeAlias and followerAlias = :followerAlias',
        ExpressionAttributeValues: { 
            ':followeeAlias': followeeAlias,
            ':followerAlias': followerAlias,
        },
        Limit: 10
    }
    try {
        let data = await dynamoDb.query(params).promise();
        console.log('data: ', data);
        return data;
    } catch (error) {
        console.log('ERROR::Data::Followers.isFollowing', error.message);
        throw new Error(error.message);
    }
}


const getFollowersWithLimit = async (alias: string, limit: number, startKey: string | null)  => {

    console.log('Table Name: ', TableName);
    const params: any = {
        TableName,
        KeyConditionExpression: 'followeeAlias = :followeeAlias',
        ExpressionAttributeValues: { ':followeeAlias': alias},
        Limit: limit
    }

    if(startKey){ 
        params.ExclusiveStartKey = startKey;
    }

    try {
        const data = await dynamoDb.query(params).promise();
        console.log('data for followers: ', data.Items)
        return {
            data: data.Items, 
            key: data.LastEvaluatedKey
        }

    } catch (error) {
        console.log('ERROR::Data::Followers.getFollowers', error.message);
        throw new Error(error.message);
    }
}

const getFollowing = async (alias: string): Promise<string[]>  => {

    const params = {
        TableName,
        IndexName: 'followerAliasIndex', 
        KeyConditionExpression: 'followerAlias = :followerAlias',
        ExpressionAttributeValues: { ':followerAlias': alias} 
    }

    try {
        const data = async () => {
            let data = await dynamoDb.query(params).promise();
            return data;
        } 

        const response = await data();
        console.log('getFollowers: ', response);
        return response.Items;

    } catch (error) {
        console.log('ERROR::Data::Followers.getFollowing', error.message);
        throw new Error(error.message);
    }
}

const getFollowingWithLimit = async (alias: string, startKey: string | null)  => {

    const params: any = {
        TableName,
        IndexName: 'followerAliasIndex', 
        KeyConditionExpression: 'followerAlias = :followerAlias',
        ExpressionAttributeValues: { ':followerAlias': alias},
        Limit: 10
    }

    if(startKey){ 
        params.ExclusiveStartKey = startKey;
    }

    try {
        const data = await dynamoDb.query(params).promise();
        return {
            following: data.Items, 
            key: data.LastEvaluatedKey
        }

    } catch (error) {
        console.log('ERROR::Data::Following.getFollowing', error.message);
        throw new Error(error.message);
    }
}

export {
    getFollowers,
    getFollowing,
    addFollow,
    getFollowersWithLimit,
    getFollowingWithLimit,
    isFollowing,
    removeFollow
}