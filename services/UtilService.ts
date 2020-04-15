import { getFollowing } from '../data/Follow' 

export default class  UtilService {

    isFollowing = async (followerAlias: string, followeeAlias: string): Promise< Boolean | null> => {
        const isFollowingPromise = getFollowing(followerAlias);
        const isFollowingResult: any = await isFollowingPromise;
        let x  = isFollowingResult.filter( x =>  x.followeeAlias == followeeAlias); 
        return  x.length > 0
    }

}
