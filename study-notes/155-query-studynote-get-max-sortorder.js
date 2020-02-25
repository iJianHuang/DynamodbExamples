/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";
const playListId = //"jhuang@example.com/2020-02-16T21:49:19.220Z";
    "jhuang@example.com/2020-02-16T17:35:24.511Z";

function extractSortOrder(data) {
    if (data.Count > 0) {
        console.log(data.Items[0].SortOrder.N);
        return data.Items[0].SortOrder;
    } else {
        return { "N": 0 };
    }
}

const params = {
    "TableName": tablePrefix + "StudyNote",
    "IndexName": "LSI-Examples-StudyNote-PlayListId-SortOrder",
    "KeyConditionExpression": "PlayListId = :plid",
    "ExpressionAttributeValues": {
        ":plid": { "S": playListId }
    },
    "ScanIndexForward": false,
    "Limit": 1,
    //ProjectionExpression: "col1, col2, etc",
    "ReturnConsumedCapacity": "TOTAL"
};

dynamodb
    .query(params).promise()
    .then(print)
    .then(extractSortOrder)
    .then(print)
    .catch(print);