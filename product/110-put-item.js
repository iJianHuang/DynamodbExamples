var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var print = require('../lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
const tablePrefix = "Examples.";

var params = {
    "TableName": tablePrefix + "ProductCategory",
    "Item": {
        "Id": { "N": "789" },
        "ProductCategory": { "S": "Home Improvement" },
        "Price": { "N": "52" },
        "InStock": { "BOOL": true },
        "Brand": { "S": "Acme" }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.putItem(params).promise();

promise
    .then(print)
    .catch(print);