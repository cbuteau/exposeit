
function iterate(array, callback) {
  var len = array.length;
  for (var i = 0; i < len; i++) {
    callback(array[i], i , array);
  }
}

function isFunction(func) {
  if (func.apply && func.call && func.bind) {
    return true;
  }
  return false;
}

function findAll(obj, keys) {
  var funcs = [];
  var props = [];
  iterate(keys, function(key) {
    if (isFunction(obj[key])) {
      funcs.push(key);
    } else {
      props.push(key);
    }
  });

  return {
    funcs: funcs,
    props: props
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
    all = {
      funcs: defFuncs,
      props: defProps
    };
  }
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



function createInterfaceOld(obj, def) {
  var newwrapper = {};
  var keys = Object.keys(obj);
  var funcKeys = findFunctions(obj, keys);
  if (def) {
    var defKeys = Object.keys(def);
    var defFuncs = findFunctions(obj, defKeys);
  } else {
    var defFuncs = funcKeys.filter(function(key) {
      return !key.startsWith('_');
    });
  }
  iterate(defFuncs, function(key) {
    var func = obj[key];

    console.log('name: ' + key + ' params:' + func.length);

    if (funcKeys.indexOf(key) !== -1) {
      newwrapper[key] = function() {
        return func.apply(obj, arguments);
      };
    }
  });

  return newwrapper;
}

// if we think of more utilities to expose we will...
if (typeof module !== undefined && typeof module.exports !== undefined) {
  module.exports = createInterface;
} else {
  window.exposeit = createInterface;
}
//module.exports = createInterface;
//
// module.exports = {
//   create: createInterface
// };
