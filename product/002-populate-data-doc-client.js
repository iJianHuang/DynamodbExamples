/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const print = require('../lib/helpers').printPretty;
const tablePrefix = "Examples.";

const putReqsProductCategory = [{
    "PutRequest": {
        "Item": {
            "Id": 123,
            "Title": "Bicycle 123",
            "Description": "123 description",
            "BicycleType": "Hybrid",
            "Brand": "Brand-Company C",
            "Price": 500,
            "Color": ["Red", "Black"],
            "ProductCategory": "Bicycle",
            "InStock": true,
            "QuantityOnHand": null,
            "RelatedItems": [341, 472, 649],
            "Pictures": {
                "FrontView": "http://example.com/products/123_front.jpg",
                "RearView": "http://example.com/products/123_rear.jpg",
                "SideView": "http://example.com/products/123_left_side.jpg"
            },
            "ProductReviews": {
                "FiveStar": [
                    "Excellent! Can't recommend it highly enough! Buy it!",
                    "Do yourself a favor and buy this."
                ],
                "OneStar": [
                    "Terrible product! Do not buy this."
                ]
            },
            "Comment": "This product sells out quickly during the summer",
            "Safety.Warning": "Always wear a helmet"
        }
    }
}];

let req = {
    RequestItems: {
        'Examples.ProductCategory': putReqsProductCategory
    },
    "ReturnConsumedCapacity": "TOTAL"
};
dynamodb.batchWrite(req).promise()
    .then(print)
    .catch(print);