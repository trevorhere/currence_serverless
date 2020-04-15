const { getFeedWithLimit } = require('../data/Feed');
const { getUser } = require('../data/User');

export default class FeedSevice {


    buildFeed = async(alias: string, key: {}): Promise < any | null> => {
        const getFeedPromise = getFeedWithLimit(alias, key);
        const res = await getFeedPromise;
        let feed = res.data;
        let newKey = res.key;

        let user = await getUser(alias);

        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }
        
        return {
        feed: feed.sort(compare),
        key: newKey,
        user
        }
    }

}