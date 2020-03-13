import { User, Status} from '../Models'

import { 
    DB_Users, 
    DB_Statuses, 
    DB_Aliases,
    seedDB
} from './builder'


const getUsers = () => {
    return [...DB_Users]
}

const addUser = (user: User):void => {
    DB_Users.push(user);
}

const getAliases = () => {
    return [...DB_Aliases]
}

const getStatuses = () => {
    return [...DB_Statuses]
}

const addStatus = (status: Status):void => {
    DB_Statuses.push(status);
}
const getUser = (alias: string):  User | null => {

    let user = DB_Users.filter( user => {
        return user.getID() === alias;
    })

    if(user.length > 0){
        return user[0];
    } else {
        return null;
    }
}


export
{
    getUser,  
    addUser,
    getUsers,  
    getStatuses,
    addStatus,
    getAliases,
    seedDB
}


