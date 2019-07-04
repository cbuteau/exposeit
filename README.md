
# exposeit

## Abstract

I wanted to build a library for building interfaces but jint and interface was taken.
SO it became callconv....then exposeit...

## Badges/Status


### Circle CI Build

[![CircleCI](https://circleci.com/gh/cbuteau/typecodes.svg?style=svg)](https://circleci.com/gh/cbuteau/typecodes)

### npm Version

[![npm version](http://img.shields.io/npm/v/exposeit.svg?style=flat)](https://npmjs.org/package/exposeit "View this project on npm")

### npm big badge

[![NPM](https://nodei.co/npm/exposeit.png)](https://nodei.co/npm/exposeit/)

## Goal

Create a redirector that only exposes the functions you want to expose.

The idea is you use the mechanism to create an interface pointer to other modules developed by another group.

```javascript
var exposeit = require('exposeit');

var complex = {
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

var compDef =  {
  store: function(key, value) {},
  get: function(key) {},
  dump: function() {}
};

var proxy = exposeit(complex, compDef);
// now proxy has store, get, dump

```


## Plan

+ [x] First Step Node JS module with tests.
+ [ ] Maybe rewrite using amddefine...
+ [ ] Second Step Web Lib also with Separate tests (separate jasmine config)
+ [ ] Third Step

https://github.com/jrburke/amdefine

https://itnext.io/testing-your-javascript-in-a-browser-with-jest-puppeteer-express-and-webpack-c998a37ef887
