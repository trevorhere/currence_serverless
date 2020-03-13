import { User, Status } from '../models'

export const DB_Users: User[] = [];
export const DB_Statuses: Status[] = [];
export const DB_Aliases: string[] = [];


const url1 = "https://i.imgur.com/TJtR10j.png";
const url2 = "https://i.imgur.com/7uQJRfe.png";
const url3 = "https://i.imgur.com/sJE8BhU.png"

export const seedDB = () => {

    console.log('🌱 seeding DB  🌱')  

    const UserA = new User("trevor", "trevor", "emailA","$2b$10$bM5C.Gr6eaLcoG0WHtnsou0Hrahh2V8P9EMKBnNsEYPh3X8td91Qm", url1);
    const UserB = new User("aliasB", "aliasB","emailB","passwordB" ,url2);
    const UserC = new User("aliasC", "aliasC","emailC","passwordC", url3);

    DB_Users.push(UserA, UserB, UserC);

    const  StatusA1 = new Status("aliasA","aliasA","this is status A1");
    const  StatusA2 = new Status("aliasA","aliasA","this is status A2");
    const  StatusA3 = new Status("aliasA","aliasA","this is status A3");

    const  StatusB1 = new Status("aliasB","aliasB","this is status B1");
    const  StatusB2 = new Status("aliasB","aliasB","this is status B2");
    const  StatusB3 = new Status("aliasB","aliasB","this is status B3");
    const  StatusB4 = new Status("aliasB","aliasB","this is status B4");
    const  StatusB5 = new Status("aliasB","aliasB","this is status B5");
    const  StatusB6 = new Status("aliasB","aliasB","this is status B6");

    const  StatusC1 = new Status("aliasC","aliasC","this is status C1");
    const  StatusC2 = new Status("aliasC","aliasC","this is status C2");
    const  StatusC3 = new Status("aliasC","aliasC","this is status C3");
    const  StatusC4 = new Status("aliasC","aliasC","this is status C4");
    const  StatusC5 = new Status("aliasC","aliasC","this is status C5");
    const  StatusC6 = new Status("aliasC","aliasC","this is status C6");


    DB_Statuses.push(
        StatusA1,
        StatusA2, 
        StatusA3, 
        StatusB1, 
        StatusB2, 
        StatusB3, 
        StatusB4, 
        StatusB5, 
        StatusB6, 
        StatusC1, 
        StatusC2,
        StatusC3,
        StatusC4, 
        StatusC5,
        StatusC6
    )

    // add followers for every user
    UserA.addFollower(UserB);
    UserA.addFollower(UserC);

    UserB.addFollower(UserA);
    UserB.addFollower(UserC);

    UserC.addFollower(UserA);
    UserC.addFollower(UserB);

    // add followees for every user
    UserA.addFollowing(UserB);
    UserA.addFollowing(UserC);

    UserB.addFollowing(UserA);
    UserB.addFollowing(UserC);

    UserC.addFollowing(UserA);
    UserC.addFollowing(UserB);

    // add statuses for every user
    UserA.addStatus(StatusA1);
    UserA.addStatus(StatusA2);
    UserA.addStatus(StatusA3);

    UserB.addStatus(StatusB1);
    UserB.addStatus(StatusB2);
    UserB.addStatus(StatusB3);
    UserB.addStatus(StatusB5);
    UserB.addStatus(StatusB4);
    UserB.addStatus(StatusB6);

    UserC.addStatus(StatusC1);
    UserC.addStatus(StatusC2);
    UserC.addStatus(StatusC3);
    UserC.addStatus(StatusC4);
    UserC.addStatus(StatusC5);
    UserC.addStatus(StatusC6);
}

