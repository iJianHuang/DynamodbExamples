/* jshint node: true */
/* jshint mocha: true */
/* jshint expr: true */
/* jshint -W124 */
'use strict';

const _ = require('lodash');
const co = require("co");
const assert = require('assert');
const expect = require('chai').expect;

const print = require('../../lib/helpers').printPretty;
const changeOrder = require('../../study-notes/320-change-displayorders').changeOrder;

const tablePrefix = "Examples.";
const userId = "jhuang@example.com";


describe('Given disply orders', co.wrap(function*() {
    let displayorders = [{
            "S": "A"
        },
        {
            "S": "B"
        },
        {
            "S": "C"
        },
        {
            "S": "D"
        }
    ];

    before(co.wrap(function*() {

    }));

    after(co.wrap(function*() {

    }));

    describe('Change Order - Insert Before Destination', co.wrap(function*() {
        describe('Move A before B', co.wrap(function*() {
            it('should return ABCD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'B');

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABCD');
            }));
        }));

        describe('Move A before C', co.wrap(function*() {
            it('should return BACD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'C');

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('BACD');
            }));
        }));

        describe('Move A before D', co.wrap(function*() {
            it('should return BCAD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'D');

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('BCAD');
            }));
        }));

        describe('Move D before D', co.wrap(function*() {
            it('should return ABCD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, "D", "D");

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABCD');
            }));
        }));

        describe('Move D before C', co.wrap(function*() {
            it('should return ABDC', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, "D", "C");

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABDC');
            }));
        }));

        describe('Move D before B', co.wrap(function*() {
            it('should return ADBC', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, "D", "B");

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ADBC');
            }));
        }));

        describe('Move D before A', co.wrap(function*() {
            it('should return DABC', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, "D", "A");

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('DABC');
            }));
        }));
    }));


    describe('Change Order - Insert After Destination', co.wrap(function*() {
        describe('Move A after A', co.wrap(function*() {
            it('should return ABCD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'A', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABCD');
            }));
        }));

        describe('Move A after B', co.wrap(function*() {
            it('should return BACD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'B', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('BACD');
            }));
        }));

        describe('Move A after D', co.wrap(function*() {
            it('should return BCDA', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'A', 'D', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('BCDA');
            }));
        }));

        describe('Move D after D', co.wrap(function*() {
            it('should return ABCD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'D', 'D', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABCD');
            }));
        }));

        describe('Move D after C', co.wrap(function*() {
            it('should return ABCD', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'D', 'C', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABCD');
            }));
        }));

        describe('Move D after B', co.wrap(function*() {
            it('should return ABDC', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'D', 'B', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ABDC');
            }));
        }));

        describe('Move D after A', co.wrap(function*() {
            it('should return ADBC', co.wrap(function*() {
                // Arrange
                let myDisplayOrders = _.clone(displayorders);

                // Action
                let newDisplayOrders = changeOrder(myDisplayOrders, 'D', 'A', true);

                // Assert
                let newDisplayOrdersChars = _.join(_.map(newDisplayOrders, 'S'), '');
                expect(newDisplayOrdersChars).to.equal('ADBC');
            }));
        }));
    }));


}));