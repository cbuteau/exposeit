
function iterate(array, callback) {
  var len = array.length;
  for (var i = 0; i < len; i++) {
    callback(array[i], i , array);
  }
}

function isFunction_Function(func) {
  if (func.apply && func.call && func.bind) {
    return true;
  }
  return false;
}

function isObject_Old(value) {
  if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {
    return true;
  }
  return false;
}

function isObject(value) {
  return tc.is(value, tc.CODES.OBJECT);
}

function isFunction(func) {
  return tc.is(func, tc.CODES.FUNCTION);
}


function isProp(value) {
  var code = tc.get(value);
  return code === tc.CODES.BOOLEAN || code === tc.CODES.STRING || code === tc.CODES.DATE || code === tc.CODES.REGEX || code === tc.CODES.ARRAY || code === tc.CODES.NUMBER;
}

function findAll(obj, keys) {
  var funcs = [];
  var props = [];
  var objs = [];
  iterate(keys, function(key) {
    var current = obj[key];
    var code = tc.get(current);
    switch (code) {
      case tc.CODES.OBJECT:
        objs.push(key);
        break;
      case tc.CODES.FUNCTION:
        funcs.push(key);
        break;
      case tc.CODES.BOOLEAN:
      case tc.CODES.STRING:
      case tc.CODES.DATE:
      case tc.CODES.REGEX:
      case tc.CODES.ARRAY:
      case tc.CODES.NUMBER:
        props.push(key);
        break;
      default:
        console.log(tc.str(code)  + ' unmapped');
    }
    // if (isProp(current)) {
    //   props.push(key);
    // } else if (isFunction(current)) {
    //   objs.push(key);
    // } else if (isObject(obj[key])) {
    //   funcs.push(key);
    // }
  });

  return {
    funcs: funcs,
    props: props,
    objs: objs
  };
}

function findFunctions(obj, keys) {
  iterate(keys, function(key) {
    if (isFunction(obj[key])) {
      keylist.push(key);
    }
  });
  var keylist = [];

  return keylist;
}

function createInterface(obj, def) {
  var newwrapper = {};
  var keys = Object.keys(obj);
  var all = findAll(obj, keys);
  if (def) {
    var defKeys = Object.keys(def);
    all = findAll(obj, defKeys);
  } else {
    var defFuncs = all.funcs.filter(function(key) {
      return !key.startsWith('_');
    });
    var defProps = all.props.filter(function(key) {
      return !key.startsWith('_');
    });
    var defObjs = all.objs.filter(function(key) {
      return !key.startsWith('_');
    });
    all = {
      funcs: defFuncs,
      props: defProps,
      objs: defObjs
    };
  }
  iterate(all.objs, function(key) {
    var subobj = obj[key];
    if (def[key]) {
      var subInt = createInterface(subobj, def[key]);
      Object.defineProperty(newwrapper, key, {
        get: function() {
          return subInt;
        }
      });
    }
  });

  iterate(all.funcs, function(key) {
    var func = obj[key];

    console.log('name: ' + key + ' params:' + func.length);
    newwrapper[key] = function() {
      return func.apply(obj, arguments);
    };
  });

  iterate(all.props, function(key) {
    Object.defineProperty(newwrapper, key, {
      get: function() {
        return obj[key];
      },
      set: function(value) {
        obj[key] = value;
      }
    })
  });

  return newwrapper;
}



// if we think of more utilities to expose we will...
if (window && window.performance) {
  window.exposeit = createInterface;
} else {
  module.exports = createInterface;
}
