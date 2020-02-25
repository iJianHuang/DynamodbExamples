/* jshint node: true */
'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const print = require('../lib/helpers').printPretty;
const dynamodb = new AWS.DynamoDB();
const getItemPlayList = require('./106-getitem-playlist').getItemPlayList;
const changeOrder = require('./320-change-displayorders').changeOrder;
const updatePlayListDisplayOrders = require('./330-update-playlist-displayorders').updatePlayListDisplayOrders;
const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const playListId = "jhuang@example.com/2020-02-16T21:49:19.220Z";
const displayOrders = {
    "L": [{
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T03:15:30.353Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T22:28:14.088Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-23T20:17:11.704Z"
        },
        {
            "S": "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-23T20:17:27.487Z"
        }
    ]
};

function extractDisplayOrders(data) {
    return data.Item.DisplayOrders.L;
}



getItemPlayList(userId, playListId)
    //.then(print)
    .then(extractDisplayOrders)
    .then(print)
    .then((orders) => changeOrder(orders,
        "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-23T20:17:11.704Z",
        "jhuang@example.com/2020-02-16T21:49:19.220Z/2020-02-19T22:28:14.088Z"))
    .then(print)
    .then((displayOrders) => updatePlayListDisplayOrders(userId, playListId, { "L": displayOrders }))
    .catch(print);