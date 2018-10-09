
var jint = require('..');

var testObj = {
  _data: [],
  append: function(item) {
    this._data.push(item);
  },
  sum: function() {
    var total = 0;
    for (var i =0; i < this._data.length; i++) {
      total += this._data[i];
    }

    return total;
  },
  _clear: function() {
    this._data.length = 0;
  }
};

var objDef = {
  append: function(item) {},
  sum: function() {}
};

var proxy;

describe('First Tests', function() {
  beforeAll(function() {
    proxy = jint.create(testObj, objDef);
  });

  afterEach(function() {
    testObj._clear();
  });

  it ('Create', function() {
    //var proxy = jint.create(testObj, objDef);
    proxy.append(10);
    proxy.append(20);
    expect(proxy.sum()).toBe(30);
  });

  it ('Check exposure', function() {
    //var proxy = jint.create(testObj, objDef);
    proxy.append(10);
    proxy.append(20);
    proxy.append(30);
    expect(proxy.sum()).toBe(60);
    expect(proxy._data).toBe(undefined);
  });
});
