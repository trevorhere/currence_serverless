const { getUser, createUser } = require('../data/User');
import { User } from '../models';

class UserService {
    getUser = async(alias: string): Promise< User | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        return user;
    }

    createUser = async (alias: string, password: string, picture: string): Promise< User | null> => {
        const userPromise = createUser(alias, password, picture);
        const user: User = await userPromise;
        return user;
    }
}


module.exports = UserService