# Overview
tape-filter is a [tapejs] decorator that adds the capability to filter test cases.

# Installation
npm install tape-filter

# API

The module's API consists of a single function that requires a tapejs implementation to decorate, as well as an optional expression by which to filter tests.  If an expression is not provided, the process's "test-filter" argument will be used, and if neither is provided, no tests will be filtered.

```javascript
/**
 * Returns a decorated tapejs implementation with test filtering support
 * @param {!Function} tape - A tapejs implementation
 * @param {string} expression - A regular expression by which to filter tests
 */
module.exports = function(tape, expression) {
  ...
}
```

# Usage Example

The following sections display the effect of the command-line argument test filtering.

**Unit Test Source:**
```javascript
const tape = require('tape');
const test = require('tape-filter')(tape);

function foo() {
  return 123;
}

function bar() {
  return 321;
}

test('foo should return 123', function(t) {
  t.plan(1);
  const expected = 123;
  const actual = foo();
  t.equal(expected, actual);
});

test('bar should return 321', function(t) {
  t.plan(1);
  const expected = 321;
  const actual = bar();
  t.equal(expected, actual);
});
```

**Shell command without filtering:**
```shell
[user@box:~/project$] node test.js 
TAP version 13
# foo should return 123
ok 1 should be equal
# bar should return 321
ok 2 should be equal

1..2
# tests 2
# pass  2

# ok
```

**Shell command with filtering:**
```shell
[user@box:~/project$] node test.js --test-filter=".*foo.*"
TAP version 13
# foo should return 123
ok 1 should be equal

1..1
# tests 1
# pass  1

# ok
```

[tapejs]: https://github.com/substack/tape
