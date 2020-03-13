import { seedDB, getUsers } from '../db/index'

const getUser = async (alias: string): Promise<{}>  => {

    seedDB();
    return await getUsers().find(user =>  user["alias"] == alias)
}

export {
    getUser,
}


