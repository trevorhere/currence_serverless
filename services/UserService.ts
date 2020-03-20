const { getUser, createUser } = require('../data/User');
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
}

module.exports = UserService