/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";

const params = {
    "TableName": tablePrefix + "StudyNote",
    "KeyConditionExpression": "PlayListId = :plid",
    "ExpressionAttributeValues": {
        //":plid": { "S": "jhuang@example.com/2020-02-16T17:35:24.511Z" }
        ":plid": { "S": playListId }
    },
    //ProjectionExpression: "Id",
    "ReturnConsumedCapacity": "TOTAL"
};

dynamodb
    .query(params).promise()
    .then(print)
    .catch(print);