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
    "UpdateExpression": "SET #pr.#5star = list_append(#pr.#5star, :vals)",
    "ExpressionAttributeNames": {
        "#pr": "ProductReviews",
        "#5star": "FiveStar"
    },
    "ExpressionAttributeValues": {
        ":vals": {
            "L": [
                { "S": "A+" },
                { "S": "Ok" },
                {
                    "M": {
                        "User": { "S": "Jian" },
                        "Comment": { "S": "Excellent! " }
                    }
                }
            ]
        }
    },
    "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.updateItem(params).promise();

promise
    .then(print)
    .catch(print);