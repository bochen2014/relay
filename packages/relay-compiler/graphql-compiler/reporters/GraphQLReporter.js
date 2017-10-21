/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule GraphQLReporter
 * @flow
 * @format
 */

'use strict';

export interface GraphQLReporter {
  reportError(caughtLocation: string, error: Error): void,
}
