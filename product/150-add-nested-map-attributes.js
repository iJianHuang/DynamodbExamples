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
    "UpdateExpression": "SET #pr.#5star[1] = :r5, #pr.#3star = :r3",
    "ExpressionAttributeNames": {
        "#pr": "ProductReviews",
        "#5star": "FiveStar",
        "#3star": "ThreeStar"
    },
    "ExpressionAttributeValues": {
        ":r5": { "S": "Very happy with my purchase" },
        ":r3": {
            "L": [
                { "S": "Just OK - not that great" }
            ]
        }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.updateItem(params).promise();

promise
    .then(print)
    .catch(print);