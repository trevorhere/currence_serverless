
import { Status } from './Status';
export class User {
    alias:string;
    password: string;
    picture: string;
    followers: string[];
    following: string[];
    statuses: string[];
    feed: string[];

    constructor(alias:string,password:string,picture:string){
        this.alias = alias;
        this.password = password;
        this.picture = picture;
        this.followers = [];
        this.following = [];
        this.statuses = [];
        this.feed = [];
    }


    getPicture():string{
        return this.picture;
    }
    getAlias():string{
        return this.alias;
    }
    setPassword(password:string): void {
        this.password = password;
    };
    getPassword(): string{
        return this.password;
    };
    addFollower(alias: string): void{
        this.followers.push(alias);
    }
    removeFollower(alias: string): void {
        this.setFollowers(this.followers.filter(a => a !==  alias))
    }
    getFollower(alias: string): string | undefined{
        return this.followers.find(a =>  a === alias)
    }
    getFollowers(): string[]{
        return this.followers;
    }
    setFollowers(aliases: string[]): void {
        this.followers = [...aliases];
    }
    addFollowing(alias: string): void{
        this.following.push(alias);
    }
    removeFollowing(alias: string): void {
        this.setFollowing(this.following.filter(a => a !==  alias))
    }
    getFollowee(alias: string): string | undefined {
        return this.following.find(a =>  a === alias)
    }
    setFeed(statuses: string[]):void {
        this.feed = [...statuses]
    }
    setFollowing(aliases: string[]): void {
    this.following = [...aliases];
    }
    getFollowing(): string[]{
        return this.following;
    }
    getFeed(): string[]{
        return this.feed;
    }
    addStatus(status: Status): void {
        this.statuses.push(status.id);
     //  console.log(this.email,'added status: ', status.id, status.message);
    }
    getStatuses(): string[] {   
     //   console.log('get statuses: ',[...this.statuses])     
        return this.statuses;
    }
}