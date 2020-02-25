const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const print = require('../lib/helpers').printPretty;
const dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";

let params = {
    "TableName": tablePrefix + "ProductCategory",
    "Key": {
        "Id": { "N": "789" }
    },
    "UpdateExpression": "SET Price = if_not_exists(Price, :p)",
    "ExpressionAttributeValues": {
        ":p": { "N": "100" }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.updateItem(params).promise();

promise
    .then(print)
    .catch(print);