import { seedDB, getUsers, addStatus } from '../db/index'
import { Status } from '../models';

const createStatus = async (alias: string, message: string): Promise<{}>  => {

    seedDB();

    const status  = new Status(alias, alias, message);
    addStatus(status);
    
    const userPromise =  getUsers().find(user =>  user["alias"] == alias)
    const user = await userPromise;
    user.addStatus(status);
    // console.log('querying user from db: ', user);
    return  status;
}

export {
    createStatus
}


