/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples";

function createPlayListTable() {
    var params = {
        TableName: tablePrefix + ".PlayList",
        KeySchema: [{
            AttributeName: "UserId",
            KeyType: "HASH"
        }, {
            AttributeName: "PlayListId",
            KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
            AttributeName: "UserId",
            AttributeType: "S"
        }, {
            AttributeName: "PlayListId",
            AttributeType: "S"
        }, {
            AttributeName: "PlayListName",
            AttributeType: "S"
        }, {
            AttributeName: "Views",
            AttributeType: "N"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        LocalSecondaryIndexes: [{
            IndexName: "LSI-" + tablePrefix + "-PlayList-UserId-PlayListName",
            KeySchema: [{
                AttributeName: "UserId",
                KeyType: "HASH"
            }, {
                AttributeName: "PlayListName",
                KeyType: "RANGE"
            }],
            Projection: {
                NonKeyAttributes: null,
                ProjectionType: "ALL"
            }
        }, {
            IndexName: "LSI-" + tablePrefix + "-PlayList-UserId-Views",
            KeySchema: [{
                AttributeName: "UserId",
                KeyType: "HASH"
            }, {
                AttributeName: "Views",
                KeyType: "RANGE"
            }],
            Projection: {
                NonKeyAttributes: null,
                ProjectionType: "ALL"
            }
        }]
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function createStudyNoteTable() {
    var params = {
        TableName: tablePrefix + ".StudyNote",
        KeySchema: [{
            AttributeName: "PlayListId",
            KeyType: "HASH"
        }, {
            AttributeName: "Id",
            KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
            AttributeName: "PlayListId",
            AttributeType: "S"
        }, {
            AttributeName: "Id",
            AttributeType: "S"
        }, {
            AttributeName: "Status",
            AttributeType: "S"
        }, {
            AttributeName: "SortOrder",
            AttributeType: "N"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        LocalSecondaryIndexes: [{
            IndexName: "LSI-" + tablePrefix + "-StudyNote-PlayListId-Status",
            KeySchema: [{
                AttributeName: "PlayListId",
                KeyType: "HASH"
            }, {
                AttributeName: "Status",
                KeyType: "RANGE"
            }],
            Projection: {
                NonKeyAttributes: null,
                ProjectionType: "ALL"
            }
        }, {
            IndexName: "LSI-" + tablePrefix + "-StudyNote-PlayListId-SortOrder",
            KeySchema: [{
                AttributeName: "PlayListId",
                KeyType: "HASH"
            }, {
                AttributeName: "SortOrder",
                KeyType: "RANGE"
            }],
            Projection: {
                NonKeyAttributes: null,
                ProjectionType: "ALL"
            }
        }]
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function done() {
    console.log('Finished creating all two tables.');
}

createPlayListTable()
    .then(createStudyNoteTable)
    .catch(function(err) {
        console.log(err, err.stack);
    })
    .then(done);