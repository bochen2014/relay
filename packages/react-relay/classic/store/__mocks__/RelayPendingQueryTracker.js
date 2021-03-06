/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const RelayPendingQueryTracker = jest.genMockFromModule(
  'RelayPendingQueryTracker',
);

class MockPendingFetch {
  constructor(query) {
    this._query = query;
    this._resolvable = false;
    this._promise = new Promise((resolve, reject) => {
      this.resolve = (...args) => {
        this._resolvable = true;
        return resolve.apply(this, args);
      };
      this.reject = reject;
    });
  }
  getID() {
    return this._query.getQuery().getID();
  }
  getQuery() {
    return this._query;
  }
  getResolvedPromise() {
    return this._promise;
  }
  isResolvable() {
    return this._resolvable;
  }
}

RelayPendingQueryTracker.mockImplementation(function() {
  this.add.mock.fetches = [];
  this.add.mockImplementation(params => {
    const mockFetch = new MockPendingFetch(params.query);
    this.add.mock.fetches.push(mockFetch);
    return mockFetch;
  });

  return this;
});

module.exports = RelayPendingQueryTracker;
