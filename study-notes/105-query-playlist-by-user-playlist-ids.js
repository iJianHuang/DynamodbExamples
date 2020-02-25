/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";

function queryPlayListByUserAndPlayListIds(userId, playListId) {
    const params = {
        "TableName": tablePrefix + "PlayList",
        "KeyConditionExpression": "UserId = :userid and PlayListId = :plid",
        "ExpressionAttributeValues": {
            ":userid": { "S": userId },
            ":plid": { "S": playListId }
        },
        //ProjectionExpression: "col1, col2, etc",
        "ReturnConsumedCapacity": "TOTAL"
    };

    return dynamodb.query(params).promise();
}

queryPlayListByUserAndPlayListIds(userId, playListId)
    .then(print)
    .catch(print);

module.exports = {
    queryPlayListByUserAndPlayListIds: queryPlayListByUserAndPlayListIds
};