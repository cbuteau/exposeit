
var callconv = require('..');

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

var proxy = callconv(testObj, objDef);

describe('First Tests', function() {
  // beforeAll(function() {
  //   proxy = callconv(testObj, objDef);
  // });

  afterEach(function() {
    testObj._clear();
  });

  test ('Create', function() {
    //var proxy = jint.create(testObj, objDef);
    proxy.append(10);
    proxy.append(20);
    expect(proxy.sum()).toBe(30);
  });

  test ('Check exposure', function() {
    //var proxy = jint.create(testObj, objDef);
    proxy.append(10);
    proxy.append(20);
    proxy.append(30);
    expect(proxy.sum()).toBe(60);
    expect(proxy._data).toBe(undefined);
  });
});
