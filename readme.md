# js-partial-type-of

[![Recent Version][npm-badge]][npm-url]
[![Travis CI - Build Status][travis-badge]][travis-url]
[![Coveralls - Code Coverage Status][cov-badge]][cov-url]
[![David - Dependencies][dep-badge]][dep-url]
[![David - DevDependencies][dev-dep-badge]][dev-dep-url]
[![Doclets][doclets-badge]][doclets-url]
[![Gitter - Repository Chat][chat-badge]][chat-url]

## Synopsis

A [partial][partial-link] to provide a **better typeof capability**. Written in [UMD][umd-link].
This typeof partial returns **the practically correct** type in string representation of the specific object.

Compatible with **ECMAScript 6**.

## Install

```
npm install js-partial-type-of
```

## Usage

 - AMD (e.g.: RequireJS)
 
 ```javascript
 define(['js-partial-type-of'], function(typeOf) {        
     // you can now use typeOf
 });
 ```
 
 - CommonJS (e.g.: NodeJS)
 
 ```javascript
 var typeOf = require('js-partial-type-of');
 
 // you can now use typeOf
  ```
 
 - Browser
 
 ```javascript
 // load the source from "node_modules/js-partial-type-of/dist/js-partial-type-of.js" - for development
 // or from "node_modules/js-partial-type-of/dist/js-partial-type-of.min.js" - for production
 
 var typeOf = js_partial_type_of; // it is available in the global namespace
 
 // you can now use typeOf
  ```
 
 - General usage
 
 ```javascript
 // check the type of primitive types
 typeOf(undefined) === 'undefined'
 typeOf(null)      === 'null' // notice, that this will return **the practically correct type**
 typeOf(true)      === 'boolean'
 typeOf(false)     === 'boolean'
 typeOf(-1)        === 'number'
 typeOf(0)         === 'number'
 typeOf(1)         === 'number'
 typeOf(-Infinity) === 'number'
 typeOf(Infinity)  === 'number'
 typeOf(NaN)       === 'number'
 typeOf('')        === 'string'
 typeOf('string')  === 'string'
 typeOf(Symbol())  === 'symbol'
 
 // check the type of reference types
 typeOf([])           === 'array' // notice, that this will return **the practically correct type**
 typeOf({})           === 'object'
 typeOf(function(){}) === 'function'
 typeOf(new Date())   === 'date'
 typeOf(new RegExp()) === 'regexp'
 typeOf(/s+/g)        === 'regexp' // inline RegExp
 typeOf(new Error())  === 'error' // also for any other errors, that extend the basic Error Object
 ```
 - Default behaviour
 
 ```javascript
 // default behaviour - similar to native typeof, but it returns **the practically correct types**
 typeOf([])                === 'array' // notice, that this will return **the practically correct type**
 typeOf({})                === 'object'
 typeOf(function(){})      === 'function'
 typeOf(new Date())        === 'date'
 typeOf(new RegExp())      === 'regexp'
 typeOf(new Int8Array(0))  === 'typedarray'
 typeOf(new CustomClass()) === 'object'
 ```
 
 - Extended behaviours
 
 ```javascript
 // extended behaviour - return the specific type, rather useful for extended types
 // when originalCase is not specified, by default, every type will be all lowercase.
 typeOf([],                true) === 'array'
 typeOf({},                true) === 'object'
 typeOf(function(){},      true) === 'function'
 typeOf(new Date(),        true) === 'date'
 typeOf(new RegExp(),      true) === 'regexp'
 
 // **note the differences below compared to previous example**
 typeOf(new Int8Array(0),  true) === 'int8array'
 typeOf(new CustomClass(), true) === 'customclass'
 
 // extended behaviour - return the specific type in original case
 // it is useful for logging and/or debugging purposes in general
 typeOf([],                true, true) === 'Array'
 typeOf({},                true, true) === 'Object'
 typeOf(function(){},      true, true) === 'Function'
 typeOf(new Date(),        true, true) === 'Date'
 typeOf(new RegExp(),      true, true) === 'RegExp'
 
 // **note the differences below compared to previous example**
 typeOf(new Int8Array(0),  true, true) === 'Int8Array'
 typeOf(new CustomClass(), true, true) === 'CustomClass'
 ```

 ```javascript
 // check the type for typed arrays
 typeOf(new Int8Array(0))         === 'typedarray'
 typeOf(new Uint8Array(0))        === 'typedarray'
 typeOf(new Uint8ClampedArray(0)) === 'typedarray'
 typeOf(new Int16Array(0))        === 'typedarray'
 typeOf(new Uint16Array(0))       === 'typedarray'
 typeOf(new Int32Array(0))        === 'typedarray'
 typeOf(new Uint32Array(0))       === 'typedarray'
 typeOf(new Float32Array(0))      === 'typedarray'
 typeOf(new Float64Array(0))      === 'typedarray'
 
 // check their types with specificType = true
 typeOf(new Int8Array(0),         true) === 'int8array'
 typeOf(new Uint8Array(0),        true) === 'uint8array'
 typeOf(new Uint8ClampedArray(0), true) === 'uint8clampedarray'
 typeOf(new Int16Array(0),        true) === 'int16array'
 typeOf(new Uint16Array(0),       true) === 'uint16array'
 typeOf(new Int32Array(0),        true) === 'int32array'
 typeOf(new Uint32Array(0),       true) === 'uint32array'
 typeOf(new Float32Array(0),      true) === 'float32array'
 typeOf(new Float64Array(0),      true) === 'float64array'
 
 // get their constructor's names in non-converted (original) case.
 typeOf(new Int8Array(0),         true, true) === 'Int8Array'
 typeOf(new Uint8Array(0),        true, true) === 'Uint8Array'
 typeOf(new Uint8ClampedArray(0), true, true) === 'Uint8ClampedArray'
 typeOf(new Int16Array(0),        true, true) === 'Int16Array'
 typeOf(new Uint16Array(0),       true, true) === 'Uint16Array'
 typeOf(new Int32Array(0),        true, true) === 'Int32Array'
 typeOf(new Uint32Array(0),       true, true) === 'Uint32Array'
 typeOf(new Float32Array(0),      true, true) === 'Float32Array'
 typeOf(new Float64Array(0),      true, true) === 'Float64Array'
 ```

## Documentation

Check the source 
[here](https://github.com/jsopenstd/js-partial-type-of/blob/master/src/js-partial-type-of.js)
since it's well structured and documented. Also you can find the rendered jsDoc documentation on 
[Doclets.io](https://doclets.io/jsopenstd/js-partial-type-of/master). 

Also, check the [unit tests](https://github.com/jsopenstd/js-partial-type-of/blob/master/tests/tests.js) 
in order to grasp the full-fledged capabilities.

Have fun! ;)

## Issues

If you find any bugs and other issues, check the
[GSDC Guide - Issues](https://github.com/openstd/general-software-development-contribution-guide#issues)
section on how to submit issues in a standardized way on
[the project's issues page](https://github.com/jsopenstd/js-partial-type-of/issues).

In case you have any suggestions regarding the project (features, additional capabilities, etc.), check the
[GSDC Guide - Suggestions](https://github.com/openstd/general-software-development-contribution-guide#suggestions)
section on how to submit suggestions in an easy, standardized way on
[the project's issues page](https://github.com/jsopenstd/js-partial-type-of/issues).

## Contribution

In order to contribute to this project, check the
[GSDC Guide](https://github.com/openstd/general-software-development-contribution-guide)
for an easy, standardized way on how to contribute to projects.

## Support

If you **by any means** find this project useful,
[consider supporting the organization](https://github.com/jsopenstd/jsopenstd/blob/master/support.md).

There are multiple options to support the project and the developers.
Any means of support is beneficial and helpful.

## License

[MIT](license.md) @ Richard King

[npm-badge]:     https://img.shields.io/npm/v/js-partial-type-of.svg
[npm-url]:       https://www.npmjs.com/package/js-partial-type-of

[travis-badge]:  https://travis-ci.org/jsopenstd/js-partial-type-of.svg?branch=master
[travis-url]:    https://travis-ci.org/jsopenstd/js-partial-type-of

[cov-badge]:     https://coveralls.io/repos/github/jsopenstd/js-partial-type-of/badge.svg?branch=master
[cov-url]:       https://coveralls.io/github/jsopenstd/js-partial-type-of

[dep-badge]:     https://david-dm.org/jsopenstd/js-partial-type-of.svg
[dep-url]:       https://david-dm.org/jsopenstd/js-partial-type-of

[dev-dep-badge]: https://david-dm.org/jsopenstd/js-partial-type-of/dev-status.svg
[dev-dep-url]:   https://david-dm.org/jsopenstd/js-partial-type-of#info=devDependencies

[doclets-badge]: https://img.shields.io/badge/style-on_doclets-brightgreen.svg?style=flat-square&label=docs
[doclets-url]:   https://doclets.io/jsopenstd/js-partial-type-of/master   

[chat-badge]:    https://badges.gitter.im/jsopenstd/js-partial-type-of.svg
[chat-url]:      https://gitter.im/jsopenstd/js-partial-type-of?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge

[partial-link]:  https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#partial 
[umd-link]:      https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#umd 
