/* jshint node: true */
'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";
const createdDateTime = new Date().toISOString();
const playListId = "jhuang@example.com/2020-02-16T17:35:24.511Z";
const playListName = "Play List 2";

var params = {
    "TableName": tablePrefix + "StudyNote",
    "Item": {
        "PlayListId": {
            "S": playListId
        },
        "Id": {
            "S": playListId + "/" + createdDateTime
        },
        "Note": {
            "S": "Note 2"
        },
        "Voice": {
            "S": "Amy"
        },
        "Status": {
            "S": "PROCESSING"
        },
        "SortOrder": {
            "N": "10"
        },
        "CreatedDateTime": {
            "S": createdDateTime
        },
        "UpdatedDateTime": {
            "S": createdDateTime
        }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.putItem(params).promise();

promise
    .then(print)
    .catch(print);