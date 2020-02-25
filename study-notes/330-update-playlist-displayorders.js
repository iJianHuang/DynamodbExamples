/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const print = require('../lib/helpers').printPretty;
const dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";
const displayOrders = {
    "L": [{
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T03:15:30.353Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T22:28:14.088Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-23T20:17:11.704Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-23T20:17:27.487Z"
        }
    ]
};

function updatePlayListDisplayOrders(userId, playListId, displayOrders) {
    let params = {
        "TableName": tablePrefix + "PlayList",
        "Key": {
            "UserId": { "S": userId },
            "PlayListId": { "S": playListId }
        },
        "UpdateExpression": "SET DisplayOrders = :displayorders, UpdatedDateTime = :udt",
        "ExpressionAttributeValues": {
            ":displayorders": displayOrders,
            ":udt": { "S": new Date().toISOString() }
        },
        "ReturnConsumedCapacity": "TOTAL"
    };

    return dynamodb.updateItem(params).promise();
}

// updatePlayListDisplayOrders(userId, playListId, displayOrders)
//     .then(print)
//     .catch(print);

module.exports = {
    updatePlayListDisplayOrders: updatePlayListDisplayOrders
};