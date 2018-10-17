var callconv = require('..');

function createComplex() {
  return {
    _dict: {},
    stringProp: 'Look at this string',
    boolProp: false,
    numProp: 3.14,
    numPropInt: 20,
    store: function(key, value) {
      this._dict[key] = value;
    },
    get: function(key) {
      return this._dict[key];
    },
    dump: function() {
      var keys = Object.keys(this._dict);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        console.log('key:' + key + ' value:' + this._dict[key]);
      }
    }
  };
}

var compDef = {
  store: function(key, value) {},
  get: function(key) {},
  dump: function() {}
};

describe('Complex Object', function() {
  test ('Complex One', function() {
    var proxy = callconv(createComplex(), compDef);
    proxy.store('one', 1);
    proxy.store('two', 2);
    expect(proxy.get('one')).toBe(1);
    expect(proxy.get('two')).toBe(2);
    proxy.stringProp = 'New Value';
    expect(proxy.stringProp).toBe('New Value');
    proxy.numProp = 6.57;
    expect(proxy.numProp).toBe(6.57);
    proxy.numPropInt = 300;
    expect(proxy.numPropInt).toBe(300);
  });

})
