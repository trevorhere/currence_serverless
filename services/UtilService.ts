const { getUser } = require('../data/User');
import { User } from '../models';

export default class  UtilService {

    isFollowing = async (userAlias: string, followeeAlias: string): Promise< Boolean | null> => {
        const userPromise = getUser(userAlias);
        const user: User = await userPromise;
        return await user.following.includes(followeeAlias) ? true : false
    }

}
