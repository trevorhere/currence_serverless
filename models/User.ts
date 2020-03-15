
import { Status } from './Status';
import {getUser } from '../db'

export class User {
    id: string;
    email:string;
    alias:string;
    password: string;
    followers: string[];
    following: string[];
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
        this.setFeed(this.feed.filter(status => status.alias !== alias));
    }
    getFollowee(alias: string): string | undefined {
        return this.following.find(a =>  a === alias)
    }
    setFeed(statuses: Status[]):void {
        this.feed = [...statuses]
    }
    setFollowing(aliases: string[]): void {
    this.following = [...aliases];
    }
    getFollowing(): string[]{
        return this.following;
    }
    getFeed(): Status[]{
        return this.feed;
    }
    addStatus(status: Status): void {
        this.statuses.push(status);
        this.followers.map(follower => {
            let user = getUser(follower).feed.push(status);
        })
     //  console.log(this.email,'added status: ', status.id, status.message);
    }
    getStatuses(): Status[] {   
     //   console.log('get statuses: ',[...this.statuses])     
        return this.statuses;
    }
}