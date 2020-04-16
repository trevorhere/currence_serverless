const { getUser, createUser } = require('../data/User');
const { addFollow, getFollowers, getFollowingWithLimit, removeFollow } = require('../data/Follow');

import { User } from '../models';

export default class UserService {
    getUser = async(alias: string): Promise< User | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        console.log('user fetched: ', user)
        return user;
    }

    createUser = async (user: User): Promise< User | null> => {
        console.log('savedUser: ', user)
        const userPromise = createUser(user);
        let savedUser = await userPromise;
        return savedUser;
    }

    getFollowers = async(alias: string, key: string ): Promise<any | string[] | null> => {

        const getFollowersPromise = getFollowers(alias, key);
        const res = await getFollowersPromise;

        return { 
            followers: res.followers,
            key: res.key
        }
    }

    getFollowing = async(alias: string, key: string): Promise< any | string[] | null> => {

        const getFollowingPromise = getFollowingWithLimit(alias, key);
        const res = await getFollowingPromise;
        console.log('res in get following: ', res)

        return { 
            following: res.following,
            key: res.key
        }
    }

    unfollow = async (userAlias: string, followeeAlias:string): Promise< User | null> => {
        // const getUserPromise = getUser(userAlias);
        // const getFolloweePromise = getUser(followeeAlias);

        const removeFollowPromise = removeFollow(userAlias, followeeAlias)
        const removeFollowRes = await removeFollowPromise;
        
        // const user = await getUserPromise;
        // const followee = await getFolloweePromise;

        // let following = [...user.following.filter(f => f !==  followeeAlias)]
        // let followers = [...followee.followers.filter(f => f !==  userAlias)]

        // await updateUserFollowing(user.alias, following)
        // await updateUserFollowers(followeeAlias, followers)

        return removeFollowRes;
    }

    follow = async (userAlias: string, followeeAlias: string ): Promise< User | null> => {
        const follower = await getUser(userAlias);
        const followee = await  getUser(followeeAlias);

        const addFollowPromise = addFollow(followee, follower)
        const follow = await addFollowPromise;


        return follow;
    }
}