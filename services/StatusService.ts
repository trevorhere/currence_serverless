const { createStatus, getStatuses } = require('../data/Status');
const { getUser, updateUserStatuses, getUsers } = require('../data/User');
const uuid = require('uuid');
import { Status } from '../models';

export default class StatusService {
    StatusService(){}

    createStatus = async (alias:string, message:string ): Promise< {} | null> => {
        const status = new Status(uuid.v1(), alias, message);
        const statusPromise = createStatus(status);
        const createdStatus = await statusPromise;

        const user = await getUser(status.alias);
        console.log('user: ', user)
        const statuses = [...user.statuses]

        statuses.push(status.id);
        updateUserStatuses(status.alias, statuses)
        return createdStatus;
    }

    buildStory = async(alias: string): Promise < any[] | null> => {
        const user = await getUser(alias);
        const statuses = await getStatuses([...user.statuses], alias)
        statuses.map(status => { status['picture'] = user.picture})
        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }
        
        statuses.sort(compare)
        return statuses;
    }

    buildFeed = async(alias: string, count: number): Promise <any[] | null> => {
        const user = await getUser(alias);

        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }


        if(!user?.following.length){
            const statuses = await getStatuses([...user.statuses], alias);
            statuses.map(status => {
                status['picture'] = user.picture
            })
            return statuses.sort(compare).slice(0,count)
        }


        const following = await getUsers(user.following);
        
        // console.log('user in build feed: ' , user);
        // console.log('following in build feed: ' , following);

        let feed = [];
        const buildFeedFollowers = async () => {
            return Promise.all(
                following.map( async followee => {
                    const statuses = await getStatuses([...followee.statuses], followee.alias);
                    // console.log('statuses: ', ...statuses);
                    statuses.map(status => {
                        status['picture'] = followee.picture
                        feed.push(status);
                    })
                    return [...statuses];
            })
            ).catch(e => {
                console.log('promise error:', e.message);
            })
        }

        await buildFeedFollowers()

        const statuses = await getStatuses([...user.statuses], alias);
        statuses.map(status => {
            status['picture'] = user.picture
        })

        let result = statuses.concat(feed).sort(compare).slice(0,count);

        //console.log('result: ', result);
        // console.log('res: ', result)
        return result
    }
}
