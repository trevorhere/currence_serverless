const { getUser, createUser, updateUserFollowing, updateUserFollowers } = require('../data/User');
import { User } from '../models';

class UserService {
    getUser = async(alias: string): Promise< User | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        return user;
    }

    createUser = async (user: User): Promise< User | null> => {
        const userPromise = createUser(user);
        return await userPromise;
    }

    getFollowers = async(alias: string) => {

        const getUserPromise = this.getUser(alias);
        const user = await getUserPromise;
        const followersAliases = [...user.followers];

        const userLookup = async (a:string) => {
            return await this.getUser(a);
        }
    
        const buildFollowers = async () => {
            return Promise.all( followersAliases.map( a => userLookup(a)));
        }
    
        let followers = await buildFollowers().then(f => {
            console.log('followers: ', f);
            return [...f];
        })

        return followers;
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

    follow = async (userAlias: string, followeeAlias:string): Promise< User | null> => {
        const getUserPromise = getUser(userAlias);
        const getFolloweePromise = getUser(followeeAlias);
        
        const user = await getUserPromise;
        const followee = await getFolloweePromise;

        let following = [...user.following]
        following.push(followeeAlias)

        let followers = [...followee.followers]
        followers.push(userAlias)


        await updateUserFollowing(user.alias, following)
        await updateUserFollowers(followeeAlias, followers)

        return user;
    }
}

module.exports = UserService