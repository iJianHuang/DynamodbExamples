var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var tablePrefix = "Examples.";
// set AWS_REGION=us-east-1
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.Attributes.html
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AppendixSampleTables.html

function createProductCategoryTable() {
    var params = {
        TableName: tablePrefix + "ProductCategory",
        KeySchema: [{
            AttributeName: "Id",
            KeyType: "HASH"
        }],
        AttributeDefinitions: [{
            AttributeName: "Id",
            AttributeType: "N"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function createForumTable() {
    var params = {
        TableName: tablePrefix + "Forum",
        KeySchema: [{
            AttributeName: "Name",
            KeyType: "HASH"
        }],
        AttributeDefinitions: [{
            AttributeName: "Name",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function createThreadTable() {
    var params = {
        TableName: tablePrefix + "Thread",
        KeySchema: [{
            AttributeName: "ForumName",
            KeyType: "HASH"
        }, {
            AttributeName: "Subject",
            KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
            AttributeName: "ForumName",
            AttributeType: "S"
        }, {
            AttributeName: "Subject",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function createReplyTable() {
    var params = {
        TableName: tablePrefix + "Reply",
        KeySchema: [{
            AttributeName: "Id",
            KeyType: "HASH"
        }, {
            AttributeName: "ReplyDateTime",
            KeyType: "RANGE"
        }],
        AttributeDefinitions: [{
            AttributeName: "Id",
            AttributeType: "S"
        }, {
            AttributeName: "ReplyDateTime",
            AttributeType: "S"
        }, {
            AttributeName: "PostedBy",
            AttributeType: "S"
        }, {
            AttributeName: "Message",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        GlobalSecondaryIndexes: [{
            IndexName: "PostedBy-Message-Index",
            KeySchema: [{
                AttributeName: "PostedBy",
                KeyType: "HASH"
            }, {
                AttributeName: "Message",
                KeyType: "RANGE"
            }],
            Projection: {
                NonKeyAttributes: null,
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }]
    };
    var promise = dynamodb.createTable(params).promise();
    return promise;
}

function done() {
    console.log('Finished creating all four tables.');
}

createProductCategoryTable()
    .then(createForumTable)
    .then(createThreadTable)
    .then(createReplyTable)
    .catch(function(err) {
        console.log(err, err.stack);
    })
    .then(done);