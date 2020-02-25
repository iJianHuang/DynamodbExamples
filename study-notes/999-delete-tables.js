/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples";


function deleteStudyNoteTable() {
    var params = {
        TableName: tablePrefix + ".StudyNote"
    };
    var promise = dynamodb.deleteTable(params).promise();
    return promise;
}

function deletePlayListTable() {
    var params = {
        TableName: tablePrefix + ".PlayList"
    };
    var promise = dynamodb.deleteTable(params).promise();
    return promise;
}

function done() {
    console.log('Finished deleting all two tables.');
}

deleteStudyNoteTable()
    .then(deletePlayListTable)
    .catch(function(err) {
        console.log(err, err.stack);
    })
    .then(done);