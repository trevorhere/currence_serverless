import { seedDB, getUsers } from '../db/index'

const getUser = async (alias: string): Promise<{}>  => {

    seedDB();

    const userPromise =  getUsers().find(user =>  user["alias"] == alias)
    const user = await userPromise;
    // console.log('querying user from db: ', user);
    return  user;
}

export {
    getUser
}


