const { createStatus, getStatuses } = require('../data/Status');
const { getUser, updateUserStatuses, getUsers } = require('../data/User');
const uuid = require('uuid');
import { Status } from '../models';

export default class StatusService {
    StatusService(){}

    createStatus = async (alias:string, message:string ): Promise< Status | null> => {
        const status = new Status(uuid.v1(), alias, message);
        const statusPromise = createStatus(status);
        const createdStatus = await statusPromise;

        const user = await getUser(status.alias);
        const statuses = [...user.statuses]

        statuses.push(status.id);
        updateUserStatuses(status.alias, statuses)
        return createdStatus;
    }

    buildStory = async(alias: string): Promise <Status[] | null> => {
        const user = await getUser(alias);
        const statuses = await getStatuses([...user.statuses], alias)
        statuses.map(status => { status['picture'] = user.picture})
        return statuses;
    }

    buildFeed = async(alias: string): Promise <Status[] | null> => {
        const user = await getUser(alias);

        if(!user.following.length)
            return null;

        const following = await getUsers(user.following);



        console.log('user in build feed: ' , user);
        console.log('following in build feed: ' , following);

        let feed = [];
        const buildFeedFollowers = async () => {
            return Promise.all(
                following.map( async followee => {
                    const statuses = await getStatuses([...followee.statuses], followee.alias);
                    console.log('statuses: ', ...statuses);
                    statuses.map(status => {
                        status['picture'] = followee.picture
                        feed.push(status);
                    })
                    return [...statuses];
            }))
        }

        await buildFeedFollowers()

        const statuses = await getStatuses([...user.statuses], alias)
        return feed;
    }
}
