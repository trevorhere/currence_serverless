// const { createStatus, getStatuses } = require('../data/Status');
const { getUser } = require('../data/User');

const { addStatusToStory, getStory } = require('../data/Story');

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

        updateFeed( status, alias )

        console.log('addedStatus');
        return addedStatus;
    }

    buildStory = async(alias: string): Promise < any[] | null> => {
        const getStoryPromise = getStory(alias);
        const story = await getStoryPromise;

        let compare = (a,b) => {
            let dateA = a.createdAt;
            let dateB = b.createdAt;
            return dateA >= dateB ? -1 : 1
        }
        
        return story.sort(compare)
    }
}