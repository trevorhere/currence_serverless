import { Status } from '../models'
import { addStatusToFeed } from '../data/Feed'
var AWS = require('aws-sdk');
const SQS_URL = process.env.SQS_URL || "https://sqs.us-east-1.amazonaws.com/454900433813/FeedUpdateQueue"

// Set the region 


// Create an SQS service object

const updateFeed =  (status: Status, followerAliases: any[]) => {
  console.log('update feed');

  console.log('status: ', status);
  console.log('followerAliases: ', followerAliases);



  followerAliases.map( follower => {
    console.log('follower alias: ', follower.followerAlias)
    sendStatus(status, follower.followerAlias)
  })
}

const sendStatus = (status, feedOwnerAlias) => {
  // AWS.config.update({region: 'us-east-1'});
  console.log('send status called')
 
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
      "FeedAlias": {
        DataType: "String",
        StringValue: feedOwnerAlias
      }
    },
    MessageBody: `Sending Status ${status.id} to lambda`,
    // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    // MessageId: "Group1",  // Required for FIFO queues
    QueueUrl: SQS_URL
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.MessageId);
    }
  });

}

const recieveStatus = (event, _context) => {
  console.log('recieveStatus hit 4');

  console.log('EVENT:  ', event.Records[0].messageAttributes);

  console.log('alias:  ', event.Records[0].messageAttributes.StatusAlias.stringValue);
  console.log('message:  ', event.Records[0].messageAttributes.StatusMessage.stringValue);
  console.log('image:  ', event.Records[0].messageAttributes.StatusImage.stringValue);
  console.log('id:  ', event.Records[0].messageAttributes.StatusID.stringValue);
  console.log('feedAlias  ', event.Records[0].messageAttributes.FeedAlias.stringValue);

  let statusAlias = event.Records[0].messageAttributes.StatusAlias.stringValue;
  let statusMessage = event.Records[0].messageAttributes.StatusMessage.stringValue;
  let statusImage = event.Records[0].messageAttributes.StatusImage.stringValue;
  let statusID = event.Records[0].messageAttributes.StatusID.stringValue;
  let feedOwnerAlias = event.Records[0].messageAttributes.FeedAlias.stringValue;

  let status = new Status(statusID, statusAlias, statusMessage, statusImage);

  addStatusToFeed(feedOwnerAlias, status);
}

export {
  updateFeed,
  sendStatus,
  recieveStatus
}