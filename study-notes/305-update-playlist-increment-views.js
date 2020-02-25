/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const print = require('../lib/helpers').printPretty;
const dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";

let params = {
    "TableName": tablePrefix + "PlayList",
    "Key": {
        "UserId": { "S": "jhuang@example.com" },
        "PlayListId": { "S": "jhuang@example.com/2020-02-16T17:35:24.511Z" }
    },
    "UpdateExpression": "SET #vw = #vw + :one, UpdatedDateTime = :udt",
    "ExpressionAttributeNames": {
        "#vw": "Views"
    },
    "ExpressionAttributeValues": {
        ":one": { "N": "1" },
        ":udt": { "S": new Date().toISOString() }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.updateItem(params).promise();

promise
    .then(print)
    .catch(print);