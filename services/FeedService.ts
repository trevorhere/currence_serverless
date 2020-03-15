const { getUser } = require('../data/User');
import { User, Status } from '../models';

export default class FeedService {
    FeedService(){}

    getFeed = async(alias: string): Promise< Status[] | null> => {
        const userPromise = getUser(alias);
        const user: User = await userPromise;
        const feed = await user.getFeed();
        return feed;
    }
}
