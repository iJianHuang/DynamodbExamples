/* jshint node: true */
'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";


function deletePlayList(userId, playListId) {
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
        "ReturnConsumedCapacity": "TOTAL"
    };


    return dynamodb.deleteItem(params).promise();
}

module.exports = {
    deletePlayList: deletePlayList
};