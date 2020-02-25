/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";
const noteId = "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T22:28:14.088Z";
// "jhuang@example.com/2020-02-16T17:35:24.511Z/2020-02-16T17:35:24.511Z"

const params = {
    "TableName": tablePrefix + "StudyNote",
    "Key": {
        "PlayListId": { "S": playListId },
        "Id": { "S": noteId },
    },
    "UpdateExpression": "SET SortOrder = :n",
    "ExpressionAttributeValues": {
        ":n": { "N": "2000" }
    },
    //ProjectionExpression: "col1, col2, etc",
    "ReturnConsumedCapacity": "TOTAL"
};

dynamodb
    .updateItem(params).promise()
    .then(print)
    .catch(print);