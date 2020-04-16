import { Status } from '../models'
import { addBulkStatusToFeed } from '../data/Feed'
const {  getFollowersWithLimit } = require('../data/Follow');

var AWS = require('aws-sdk');
const SQS_URL_UPDATE_FEED = process.env.SQS_URL_UPDATE_FEED || "https://sqs.us-east-1.amazonaws.com/454900433813/FeedUpdateQueue"
const SQS_URL_FETCH_FOLLOWERS = process.env.SQS_URL_FETCH_FOLLOWERS || "https://sqs.us-east-1.amazonaws.com/454900433813/FetchFollowersQueue"

const updateFeed = async (status: Status) => {

  try {
    console.log('status: ', status);

      var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    
      var params = {
        MessageAttributes: {
          "StatusMessage": {
            DataType: "String",
            StringValue: status.message
          },
          "StatusAlias": {
            DataType: "String",
            StringValue: status.alias
          },
          "StatusID": {
            DataType: "String",
            StringValue: status.id
          },
          "StatusImage": {
            DataType: "String",
            StringValue: status.image
          },
        },
        MessageBody: `SQS_URL_FETCH_FOLLOWERS:: message: ${status.message}, id: ${status.id} to lambda`,
        QueueUrl: SQS_URL_FETCH_FOLLOWERS
      };
    
      const res = await sqs.sendMessage(params).promise();
      console.log('FETCH_FOLLOWERS_RESULT: ', res);

  } catch(error){
    console.log('ERROR:SQS.updateFeed:  ', error.message);
  }

}

const receiveFollowers = async (event, _context) => {
  try {
    // console.log('id:  ', event.Records[0].messageAttributes.StatusID.stringValue);

    let statusAlias = event.Records[0].messageAttributes.StatusAlias.stringValue;
    let statusMessage = event.Records[0].messageAttributes.StatusMessage.stringValue;
    let statusImage = event.Records[0].messageAttributes.StatusImage.stringValue;
    let statusID = event.Records[0].messageAttributes.StatusID.stringValue;
    let status = new Status(statusID, statusAlias, statusMessage, statusImage);
    console.log('SQS::recieveFollowers status: ', status)


    let currKey = null;
    let startKey = null
    let count = 0;
    do {
        let res = await getFollowersWithLimit(statusAlias, 25, startKey);
        let { data, key  } = res;

        const followerArr = data.map( f => f.followerAlias)

        console.log(`followers (${followerArr.length}): `, followerArr);
        console.log('key: ', key);
        sendStatus(status, followerArr)
        console.log('count:  ', count += 1)

        if(key){
            currKey = key;
            startKey = currKey;
        } else {
          currKey = null
          console.log(`SETTING CURRKEY TO NULL: (${currKey})`)
        }
    } while( currKey )

  } catch(error){
    console.log('ERROR:SQS.recieveFollowers:  ', error.message);
  }

}

const sendStatus = async (status, feedOwnerAliases) => {
  try {
    // AWS.config.update({region: 'us-east-1'});
    console.log('sendStatus:', status)
    console.log('ownerAlias Count:', feedOwnerAliases.length)
    console.log('ownerAliases:', feedOwnerAliases)


    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

    var params = {
      MessageAttributes: {
        "StatusMessage": {
          DataType: "String",
          StringValue: status.message
        },
        "StatusAlias": {
          DataType: "String",
          StringValue: status.alias
        },
        "StatusID": {
          DataType: "String",
          StringValue: status.id
        },
        "StatusImage": {
          DataType: "String",
          StringValue: status.image
        },
        "FeedAliases": {
          DataType: "String",
          StringValue: JSON.stringify(feedOwnerAliases)
        }
      },
      MessageBody: `Sending Status ${status.id} to lambda`,
      QueueUrl: SQS_URL_UPDATE_FEED
    };

    const res = await sqs.sendMessage(params).promise();
    console.log('UPDATE_FEED_RESULT: ', res);
      
  } catch (error){
    console.log("ERROR::SQS.sendStatus: ", error.message)
  }
}

const receiveStatus = async (event, _context) => {

  try {
    // console.log('recieveStatus');
    // console.log('EVENT:  ', event.Records[0].messageAttributes);
    // console.log('alias:  ', event.Records[0].messageAttributes.StatusAlias.stringValue);
    // console.log('message:  ', event.Records[0].messageAttributes.StatusMessage.stringValue);
    // console.log('image:  ', event.Records[0].messageAttributes.StatusImage.stringValue);
    // console.log('id:  ', event.Records[0].messageAttributes.StatusID.stringValue);
    // // console.log('feedAlias  ', event.Records[0].messageAttributes.FeedAlias.stringValue);

    let statusAlias = event.Records[0].messageAttributes.StatusAlias.stringValue;
    let statusMessage = event.Records[0].messageAttributes.StatusMessage.stringValue;
    let statusImage = event.Records[0].messageAttributes.StatusImage.stringValue;
    let statusID = event.Records[0].messageAttributes.StatusID.stringValue;
    let feedOwnerAliases = event.Records[0].messageAttributes.FeedAliases.stringValue;


    let status = new Status(statusID, statusAlias, statusMessage, statusImage);
    console.log('saving status: ', status);
    let aliases = JSON.parse(feedOwnerAliases);
    console.log(`aliases(${aliases.length}): `, aliases);

    let res = await addBulkStatusToFeed(aliases, status);
    console.log('save complete: ', res)

  } catch (error){
    console.log("ERRPR::SQS.recieveStatus: ", error.message)
  }
}

export {
  updateFeed,
  sendStatus,
  receiveStatus,
  receiveFollowers
}