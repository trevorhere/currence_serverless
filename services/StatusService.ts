const { createStatus } = require('../data/Status');
import { Status, User} from '../models';

export default class StatusService {
    StatusService(){}

    createStatus = async(alias: string, message: string): Promise< Status | null> => {
       return await createStatus(alias,message);
    }
}
