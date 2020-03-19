/* jshint node: true */
'use strict';

const print = require('../lib/helpers').printPretty;


function changeOrder(orders, source, destination, isSourceInsertedAfterDestination) {
    let indexSource = orders.findIndex(i => i.S === source);
    let indexDestination = orders.findIndex(i => i.S === destination);
    if (indexSource >= 0 && indexDestination >= 0 && indexSource !== indexDestination) {
        let sourceNote = { "S": source };
        orders.splice(indexSource, 1);
        let indexDestinationAdjusted = orders.findIndex(i => i.S === destination);
        if (isSourceInsertedAfterDestination === true) {
            orders.splice(indexDestinationAdjusted + 1, 0, sourceNote);
        } else {
            orders.splice(indexDestinationAdjusted, 0, sourceNote);
        }
    }
    return orders;
}

function changeOrderByIndexes(orders, indexSource, indexDestination) {
    if (indexSource >= 0 && indexDestination >= 0 && indexSource !== indexDestination) {
        return changeOrder(orders, orders[indexSource].S, orders[indexDestination].S);
    }
    return orders;
}

module.exports = {
    changeOrder: changeOrder,
    changeOrderByIndexes: changeOrderByIndexes
};