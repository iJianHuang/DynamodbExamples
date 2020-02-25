/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";

function queryPlayListByUserId(userId) {
    const params = {
        "TableName": tablePrefix + "PlayList",
        "KeyConditionExpression": "UserId = :userid",
        "ExpressionAttributeValues": {
            ":userid": { "S": userId }
        },
        //ProjectionExpression: "col1, col2, etc",
        "ReturnConsumedCapacity": "TOTAL"
    };

    return dynamodb.query(params).promise();
}

queryPlayListByUserId(userId)
    .then(print)
    .catch(print);

module.exports = {
    queryPlayListByUserId: queryPlayListByUserId
};