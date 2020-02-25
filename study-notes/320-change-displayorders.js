/* jshint node: true */
'use strict';

const print = require('../lib/helpers').printPretty;

function changeOrder(orders, source, destination) {
    let indexSource = orders.findIndex(i => i.S === source);
    let indexDestination = orders.findIndex(i => i.S === destination);
    if (indexSource >= 0 && indexDestination >= 0 && indexSource !== indexDestination) {
        let sourceNote = { "S": source };
        orders.splice(indexSource, 1);
        let indexDestinationAdjusted = orders.findIndex(i => i.S === destination);
        orders.splice(indexDestinationAdjusted, 0, sourceNote);
    }

    console.log(indexSource);
    console.log(indexDestination);
    print(orders);
    return orders;
}

function changeOrderByIndexes(orders, indexSource, indexDestination) {
    if (indexSource >= 0 && indexDestination >= 0 && indexSource !== indexDestination) {
        return changeOrder(orders, orders[indexSource].S, orders[indexDestination].S);
    }
    return orders;
}


// let item = {
//     "DisplayOrders": {
//         "L": [{
//                 "S": "A"
//             },
//             {
//                 "S": "B"
//             },
//             {
//                 "S": "C"
//             },
//             {
//                 "S": "D"
//             }
//         ]
//     }
// };

// let orders = item.DisplayOrders.L;

// let jsonOrders = JSON.stringify(orders);

// changeOrder(JSON.parse(jsonOrders), "D", "B");
// console.log('Expecting A D B C');

// changeOrder(JSON.parse(jsonOrders), "B", "A");
// console.log('Expecting B A C D');

// changeOrder(JSON.parse(jsonOrders), "A", "B");
// console.log('Expecting A B C D');

// changeOrder(JSON.parse(jsonOrders), "A", "C");
// console.log('Expecting B A C D');

// changeOrder(JSON.parse(jsonOrders), "B", "D");
// console.log('Expecting A C B D');

// changeOrder(JSON.parse(jsonOrders), "B", "B");
// console.log('Expecting A B C D');

module.exports = {
    changeOrder: changeOrder,
    changeOrderByIndexes: changeOrderByIndexes
};