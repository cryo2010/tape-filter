'use strict';

const argv = require('minimist')(process.argv.slice(2), {
  default: {
    'test-filter': '.*'
  }});

/**
 * Constructs a tape decorator that supports test filtering
 * @param {!Function} tape - A tapejs implementation
 * @param {string} expression - A regular expression by which to filter tests
 */
module.exports = function(tape, expression) {
  expression = expression || argv['test-filter'];
  const regex = new RegExp(expression);
  let test = function() {
    const description = arguments[0];
    if (description.match(regex)) {
      tape.apply(this, arguments);
    }
  };
  for (let key in tape) {
    test[key] = tape[key];
  }
  test.only = function() {
    const description = arguments[0];
    if (description.match(regex)) {
      tape.only.apply(this, arguments);
    }
  };
  return test;
}

