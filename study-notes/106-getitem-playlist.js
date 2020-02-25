/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";

function getItemPlayList(userId, playListId) {
    const params = {
        "TableName": tablePrefix + "PlayList",
        "Key": {
            "UserId": {
                "S": userId
            },
            "PlayListId": {
                "S": playListId
            }
        },
        //ProjectionExpression: "col1, col2, etc",
        "ReturnConsumedCapacity": "TOTAL"
    };

    return dynamodb.getItem(params).promise();
}

// getItemPlayList(userId, playListId)
//     .then(print)
//     .catch(print);

module.exports = {
    getItemPlayList: getItemPlayList
};