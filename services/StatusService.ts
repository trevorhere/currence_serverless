// const { createStatus, getStatuses } = require('../data/Status');
const { getUser } = require('../data/User');

const { addStatusToStory, getStoryWithLimit } = require('../data/Story');

const { updateFeed } = require('./SQS');
const uuid = require('uuid');
import { Status } from '../models';

export default class StatusService {
    StatusService(){}

    createStatus = async (alias:string, message:string ): Promise< {} | null> => {
        const user = await getUser(alias);
        const status = new Status(uuid.v1(), alias, message, user.picture);
        const addStatusPromise = addStatusToStory(status)
        const addedStatus = await addStatusPromise;

        updateFeed( status )

        console.log('addedStatus');
        return addedStatus;
    }

    buildStory = async(alias: string, key: string): Promise < any | null> => {
        const getStoryPromise = getStoryWithLimit(alias, key );
        const res = await getStoryPromise;
        let story = res.data;
        let newKey = res.key;
        let user = await getUser(alias);

        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }
        
        return {
            story: story.sort(compare),
            key: newKey,
            user
            }
    }
}