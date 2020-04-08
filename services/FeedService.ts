

const { getFeed } = require('../data/Feed');

export default class FeedSevice {


    buildFeed = async(alias: string): Promise < any[] | null> => {
        const getFeedPromise = getFeed(alias);
        const feed = await getFeedPromise;

        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }
        
        return feed.sort(compare)
    }

}