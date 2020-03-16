import { seedDB, getUsers, addUser } from '../db/index'
import { User } from '../models';


const getUser = async (alias: string): Promise<{}>  => {
    seedDB();

    const userPromise =  getUsers().find(user =>  user["alias"] == alias)
    const user = await userPromise;
    // console.log('querying user from db: ', user);
    return  user;
}

const createUser = async (alias: string, password: string, picture: string): Promise<{}>  => {

    seedDB();

    const user = new User(alias, alias, alias, password, picture);
    addUser(user);
    return user;
}

export {
    getUser,
    createUser
}


