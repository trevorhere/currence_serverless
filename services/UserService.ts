const { getUser, createUser, updateUserFollowing, updateUserFollowers } = require('../data/User');
const { imageUploader } = require('./S3')
const { addFollow, getFollowers, getFollowing } = require('../data/Follow');

import { User } from '../models';

export default class UserService {
    getUser = async(alias: string): Promise< User | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        return user;
    }

    createUser = async (user: User): Promise< User | null> => {
        

        // let s3ImageURL = await imageUploader(user.picture);
        // console.log('url: ', s3ImageURL);

        // user.picture = s3ImageURL;
        // console.log('user.pic', user.picture);

        const userPromise = createUser(user);

        let savedUser = await userPromise;
        return savedUser;

    }

    getFollowers = async(alias: string): Promise<User[] | string[] | null> => {

        const getFollowersPromise = getFollowers(alias);
        const followers = await getFollowersPromise;

        return followers;
    }


    getFollowing = async(alias: string): Promise<User[] | string[] | null> => {

        const getFollowingPromise = getFollowing(alias);
        const following = await getFollowingPromise;

        return following;
    }

    unfollow = async (userAlias: string, followeeAlias:string): Promise< User | null> => {
        const getUserPromise = getUser(userAlias);
        const getFolloweePromise = getUser(followeeAlias);
        
        const user = await getUserPromise;
        const followee = await getFolloweePromise;

        let following = [...user.following.filter(f => f !==  followeeAlias)]
        let followers = [...followee.followers.filter(f => f !==  userAlias)]

        await updateUserFollowing(user.alias, following)
        await updateUserFollowers(followeeAlias, followers)

        return user;
    }

    follow = async (userAlias: string, followeeAlias: string ): Promise< User | null> => {
        const follower = await getUser(userAlias);
        const followee = await  getUser(followeeAlias);

        const addFollowPromise = addFollow(followee, follower)
        const follow = await addFollowPromise;


        return follow;
    }
}