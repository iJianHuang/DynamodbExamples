/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";

const params = {
    "TableName": tablePrefix + "PlayList",
    "Key": {
        "UserId": { "S": "jhuang@example.com" },
        "PlayListId": { "S": "jhuang@example.com/2020-02-16T17:35:24.511Z" }
    },
    "UpdateExpression": "SET PlayListName = :n",
    "ExpressionAttributeValues": {
        ":n": { "S": "Play List 1" }
    },
    //ProjectionExpression: "col1, col2, etc",
    "ReturnConsumedCapacity": "TOTAL"
};

dynamodb
    .updateItem(params).promise()
    .then(print)
    .catch(print);