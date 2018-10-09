

var callconv = require('..');

function createComplex() {
  return {
    _dict: {},
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


describe('No Definitions', function() {

  it ('TRy without def', function() {
    var proxy = callconv(createComplex());
  });

});
