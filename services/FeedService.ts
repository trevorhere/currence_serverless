const { getUser } = require('../data/User');

export default class FeedService {

    FeedService(){}
    
    getFeed = async(alias: string): Promise<[] | null> => {
        const userPromise = getUser(alias);
        const user = await userPromise;
        console.log('user: ', user);
        return await null;
    }
}
