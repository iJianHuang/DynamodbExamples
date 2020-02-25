/* jshint node: true */
'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";
const createdDateTime = new Date().toISOString();
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";
//"jhuang@example.com/2020-02-16T17:35:24.511Z";



function extractSortOrder(data) {
    if (data.Count > 0) {
        console.log(data.Items[0].SortOrder.N);
        return data.Items[0].SortOrder;
    } else {
        return { "N": "0" };
    }
}

function getItemWithMaxSortOrder() {

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

    return dynamodb.query(params).promise();
}

function insertStudyNote(sortOrder) {
    console.log('sort order in insert: ' + sortOrder.N);
    let nextSortOrder = (Number(sortOrder.N) + 1000).toString();
    console.log('next order: ' + nextSortOrder);
    var params = {
        "TableName": tablePrefix + "StudyNote",
        "Item": {
            "PlayListId": {
                "S": playListId
            },
            "Id": {
                "S": playListId + "/" + createdDateTime
            },
            "Note": {
                "S": "Note " + createdDateTime
            },
            "Voice": {
                "S": "Amy"
            },
            "Status": {
                "S": "PROCESSING"
            },
            "SortOrder": {
                "N": nextSortOrder
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

getItemWithMaxSortOrder()
    .then(print)
    .then(extractSortOrder)
    .then(print)
    .then(insertStudyNote)
    .then(print)
    .catch(print);