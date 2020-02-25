/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";

const createdDateTime = new Date().toISOString();

const putReqsPlayList = [{
    "PutRequest": {
        "Item": {
            "UserId": {
                "S": "jhuang@example.com"
            },
            "PlayListId": {
                "S": "jhuang@example.com/" + createdDateTime
            },
            "PlayListName": {
                "S": "Misc"
            },
            "Views": {
                "N": "0"
            },
            "CreatedDateTime": {
                "S": createdDateTime
            },
            "UpdatedDateTime": {
                "S": createdDateTime
            }
        }
    }
}];

const putReqsStudyNote = [{
    "PutRequest": {
        "Item": {
            "PlayListId": {
                "S": "jhuang@example.com/" + createdDateTime
            },
            "Id": {
                "S": "jhuang@example.com/" + createdDateTime + "/" + createdDateTime
            },
            "Note": {
                "S": "mazon DynamoDB is a fully managed proprietary NoSQL database service that supports key-value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio. "
            },
            "Voice": {
                "S": "Joanna"
            },
            "Status": {
                "S": "PROCESSING"
            },
            "SortOrder": {
                "N": "1"
            },
            "CreatedDateTime": {
                "S": createdDateTime
            },
            "UpdatedDateTime": {
                "S": createdDateTime
            }
        }
    }
}];

let req = {
    RequestItems: {
        "Examples.PlayList": putReqsPlayList,
        "Examples.StudyNote": putReqsStudyNote
    },
    "ReturnConsumedCapacity": "TOTAL"
};
dynamodb.batchWriteItem(req).promise()
    .then(print)
    .catch(print);