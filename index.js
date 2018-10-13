
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

function findFunctions(obj, keys) {
  var keylist = [];
  iterate(keys, function(key) {
    if (isFunction(obj[key])) {
      keylist.push(key);
    }
  });

  return keylist;
}


function createInterface(obj, def) {
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
