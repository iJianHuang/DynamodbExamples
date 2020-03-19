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
const insertPlayList = require('./../../study-notes/200-insert-playlist').insertPlayList;
const deletePlayList = require('./../../study-notes/900-delete-playlist').deletePlayList;
const queryPlayListByUserId = require('../../study-notes/100-query-playlist-by-userid').queryPlayListByUserId;
const changeOrder = require('../../study-notes/320-change-displayorders').changeOrder;

const tablePrefix = "Examples.";
const userId = "jhuang@example.com";
const createdDateTime1 = "2020-01-01T01:01:01.001Z";
const createdDateTime2 = "2020-02-02T02:02:02.002Z";

describe('Given an authenicated user', co.wrap(function*() {

    before(co.wrap(function*() {
        
    }));

    after(co.wrap(function*() {

    }));

    describe('#queryPlayListByUserId(userId)', co.wrap(function*() {
        it('should return 2 when the userId is xxx', co.wrap(function*() {
            // Action
            let playList = yield queryPlayListByUserId(userId);

            // Assert
            expect(playList.Count).to.equal(2);
        }));
    }));


}));