import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import UserService from '../../services/UserService';
import { getFollowersWithLimit } from '../../data/Follow'

export const test = async (x) => {

    let currKey = null;
    let startKey = null
    do {
        let res = await getFollowersWithLimit(x, 25, startKey);

        let { data, key  } = res;

        console.log(`data(${data.length}): `, data);
        console.log('key: ', key);

        if(key){
            currKey = key;
            startKey = currKey;
        } else {
            currKey = null
        }
    } while( currKey )
}