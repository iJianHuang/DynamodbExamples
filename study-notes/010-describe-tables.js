/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples";

function describeTable(tableName) {
    var params = {
        "TableName": tablePrefix + "." + tableName
    };
    var promise = dynamodb.describeTable(params).promise();
    return promise;
}

function done(tableName) {
    console.log('Finished describe table ' + tableName);
}

describeTable("PlayList")
    .then(print)
    .catch(function(err) {
        console.log(err, err.stack);
    })
    .then(() => done("PlayList"));

describeTable("StudyNote")
    .then(print)
    .catch(function(err) {
        console.log(err, err.stack);
    })
    .then(() => done("StudyNote"));