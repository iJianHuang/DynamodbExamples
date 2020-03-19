/* jshint node: true */
'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";
// const createdDateTime = new Date().toISOString();
// const playListName = "Play List 2";

function insertPlayList(userId, playListName, createdDateTime) {
    var params = {
        "TableName": tablePrefix + "PlayList",
        "Item": {
            "UserId": {
                "S": userId
            },
            "PlayListId": {
                "S": userId + "/" + createdDateTime
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

    return dynamodb.putItem(params).promise();
}

module.exports = {
    insertPlayList: insertPlayList
};