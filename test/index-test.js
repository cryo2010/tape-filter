const test = require('tape');
const configure = require('../index');

test('test should execute', function(t) {
  t.plan(1);
  const f = function() {
    t.pass('function invoked');
  };
  const filteredTest= configure(f);
  filteredTest('test');
});

test('test should not execute', function(t) {
  t.plan(1);
  const f = function() {
    throw Error('function invoked');
  };
  const filteredTest = configure(f, '.*potato');
  try {
    filteredTest('fail');
    t.pass('test filtered');
  } catch (e) {
    t.fail('test invoked');
  }  
});

test('skip should delegate to tape.skip', function(t) {
  t.plan(1);
  const tape = {
    skip: function(u) {
      t.pass('function delegates to tape.skip');
    }
  };
  const filteredTest = configure(tape);
  filteredTest.skip('skipped test', function(u) {
  });
});

test('only should delegate to tape.only', function(t) {
  t.plan(1);
  const tape = {
    only: function() {
      t.pass('function delegates to tape.only');
    }
  };
  const filteredTest = configure(tape);
  filteredTest.only('only test', function(u) {
  });
});


