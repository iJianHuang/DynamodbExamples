var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";

var params = {
    "TableName": tablePrefix + "ProductCategory",
    "Key": {
        "Id": { "N": "789" }
    },
    "UpdateExpression": "SET ProductCategory = :c, Price = :p",
    "ExpressionAttributeValues": {
        ":c": { "S": "Hardware" },
        ":p": { "N": "60" }
    },
    // --update-expression "SET ProductCategory = :c, Price = :p" \
    "ReturnConsumedCapacity": "TOTAL"

};

var promise = dynamodb.updateItem(params).promise();

promise
    .then(print)
    .catch(print);