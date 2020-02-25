/* jshint node: true */
'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";
const createdDateTime = new Date().toISOString();
const playListName = "Play List 2";

var params = {
    "TableName": tablePrefix + "PlayList",
    "Item": {
        "UserId": {
            "S": "jhuang@example.com"
        },
        "PlayListId": {
            "S": "jhuang@example.com/" + createdDateTime
        },
        "PlayListName": {
            "S": playListName
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
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.putItem(params).promise();

promise
    .then(print)
    .catch(print);