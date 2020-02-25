/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";

function extractRelatedItems(data) {
    if (data.Count > 0) {
        console.log('data.Items[0].RelatedItems: ' + data.Items[0].RelatedItems);
        let relatedItems = data.Items[0].RelatedItems.L;
        relatedItems.forEach(element => {
            console.log(element.S);
        });

    }
    return data;
}

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
    .then(extractRelatedItems)
    .catch(print);