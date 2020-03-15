const { getUser } = require('../data/User');
import { User } from '../models';

export default class FeedService {
    UserService(){}

    getUser = async(alias: string): Promise< User | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        return user;
    }
}
