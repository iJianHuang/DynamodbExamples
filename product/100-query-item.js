/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";

const params = {
    "TableName": tablePrefix + "ProductCategory",
    "KeyConditionExpression": "Id = :id",
    "ExpressionAttributeValues": {
        ":id": { N: "789" }
    },
    //ProjectionExpression: "ProductCategory, Price, Description, RelatedItems, ProductReviews.FiveStar",
    "ReturnConsumedCapacity": "TOTAL"
};

dynamodb
    .query(params).promise()
    .then(print)
    .catch(print);