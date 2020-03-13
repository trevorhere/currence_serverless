
import { Status } from './Status';

export class User {
    id: string;
    email:string;
    alias:string;
    password: string;
    followers: User[];
    following: User[];
    statuses: Status[];
    feed: Status[];
    picture: string;

    constructor(id: string, alias:string, email:string, password:string,picture:string){
        this.id = id;
        this.email = email;
        this.alias = alias;
        this.password = password;
        this.followers = [];
        this.following = [];
        this.statuses = [];
        this.feed = [];
        this.picture = picture;
    }

    getID():string{
        return this.id;
    }
    getPicture():string{
        return this.picture;
    }
    getAlias():string{
        return this.alias;
    }
    setEmail(email:string): void {
        this.email = email;
    };
    getEmail(): string{
        return this.email;
    };
    setPassword(password:string): void {
        this.password = password;
    };
    getPassword(): string{
        return this.password;
    };
    addFollower(user: User): void{
        this.followers.push(user);
    }
    removeFollower(user: User): void {
        this.setFollowers(this.followers.filter(follower => follower.id !==  user.id))
    }
    getFollower(userID: string): User | undefined{
        return this.followers.find(follower =>  follower.id === userID)
    }
    getFollowers(): User[]{
        return this.followers;
    }
    setFollowers(followers: User[]): void {
        this.followers = [...followers];
    }
    addFollowing(user: User): void{
        this.following.push(user);
    }
    removeFollowing(user: User): void {
        this.setFollowing(this.following.filter(followee => followee.id !==  user.id))
        this.setFeed(this.feed.filter(status => status.user_id !== user.id));
    }
    getFollowee(userID: string): User | undefined {
        return this.following.find(followee =>  followee.id === userID)
    }
    setFeed(statuses: Status[]):void {
        this.feed = [...statuses]
    }
    setFollowing(followees: User[]): void {
    this.following = [...followees];
    }
    getFollowing(): User[]{
        return this.following;
    }
    getFeed(): Status[]{
        return this.feed;
    }
    addStatus(status: Status): void {
        this.statuses.push(status);
        this.followers.map(follower => {
        //    console.log('follower: ',follower.getAlias(), status.getMessage())
            follower.feed.push(status);
        })
     //  console.log(this.email,'added status: ', status.id, status.message);
    }
    getStatuses(): Status[] {   
     //   console.log('get statuses: ',[...this.statuses])     
        return this.statuses;
    }
}