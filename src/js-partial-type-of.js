/**
 * @overview A partial to provide a **better typeof capability by returning the practically correct type**
 *           in string representation of the specific object.
 *
 * @module js/partial/typeOf
 * @type {function}
 *
 * @version 0.0.0
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @license [MIT]{@link https://github.com/jsopenstd/js-partial-foreach/blob/master/license.md}
 */

/**
 * UMD - [returnExports.js pattern]{@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function(root, factory) {
    // AMD
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // CommonJS
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser
    } else {
        root.js_partial_type_of =
        root.js_partial_typeof  =
        root.js_partial_typeOf  = factory();
    }
}(this, function() {
    'use strict';

    /**
     * An index from which the actual constructor name begins.
     *
     * With the state of current JavaScript, the actual constructor name starts from index 8
     * (e.g.: '[object Array]' - the 'Array' part starts from string index 8).
     *
     * @private
     * @const
     * @type {number}
     */
    var CONSTRUCTOR_NAME_START = 8,

        /**
         * The typedef used for representing and storing the configuration for typeOf.
         *
         * @typedef {Object} config
         *
           @static
         * @memberOf js/partial/typeOf
         *
         * @property {boolean} [specificType=false] Determines whether the the returned type of the object
         *                                          should be specific or general.
         * @property {boolean} [originalCase=false] Determines whether the the returned type of the object
         *                                          should be in its original casing or should be converted
         *                                          to lowercase.
         */
        config = {
            specificType : false,
            originalCase : false
        };

    /**
     * Returns the practically correct type in string representation of the specific object.
     *
     * @public
     * @function typeOf
     *
     * @param {*}            object               The object, which type will be returned.
     *
     * @param {boolean|null} [specificType=false] Determines whether the the returned type of the object
     *                                            should be specific or general.
     *                                            If this config option is null, it will be skipped and its value
     *                                            during type check will be the default, global configuration value
     *                                            for this option. To set the global configuration for this option,
     *                                            [check setConfig]{@link js/partial/typeOf.setConfig}.
     *
     * @param {boolean}      [originalCase=false] Determines whether the the returned type of the object
     *                                            should be in its original casing or should be converted to lowercase.
     *                                            To set the global configuration for this option,
     *                                            [check setConfig]{@link js/partial/typeOf.setConfig}.
     *
     * @returns {string} The string representation of the object type.
     *
     * @example
     * // check the type of primitive types
     * typeOf(undefined) === 'undefined'
     * typeOf(null)      === 'null' // notice, that this will return **the practically correct type**
     * typeOf(true)      === 'boolean'
     * typeOf(false)     === 'boolean'
     * typeOf(-1)        === 'number'
     * typeOf(0)         === 'number'
     * typeOf(1)         === 'number'
     * typeOf(-Infinity) === 'number'
     * typeOf(Infinity)  === 'number'
     * typeOf(NaN)       === 'number'
     * typeOf('')        === 'string'
     * typeOf('string')  === 'string'
     * typeOf(Symbol())  === 'symbol'
     *
     * @example
     * // check the type of reference types
     * typeOf([])           === 'array' // notice, that this will return **the practically correct type**
     * typeOf({})           === 'object'
     * typeOf(function(){}) === 'function'
     * typeOf(new Date())   === 'date'
     * typeOf(new RegExp()) === 'regexp'
     * typeOf(/s+/g)        === 'regexp' // inline RegExp
     * typeOf(new Error())  === 'error' // also for any other errors, that extend the basic Error Object
     *
     * @example
     * // default behaviour - similar to native typeof, but it returns **the practically correct types**
     * typeOf([])                === 'array'
     * typeOf({})                === 'object'
     * typeOf(function(){})      === 'function'
     * typeOf(new Date())        === 'date'
     * typeOf(new RegExp())      === 'regexp'
     * typeOf(new Int8Array(0))  === 'typedarray'
     * typeOf(new CustomClass()) === 'object'
     *
     * // extended behaviour - return the specific type, rather useful for extended types
     * // when originalCase is not specified, by default, every type will be all lowercase.
     * typeOf([],                true) === 'array'
     * typeOf({},                true) === 'object'
     * typeOf(function(){},      true) === 'function'
     * typeOf(new Date(),        true) === 'date'
     * typeOf(new RegExp(),      true) === 'regexp'
     *
     * // **note the differences below compared to previous example**
     * typeOf(new Int8Array(0),  true) === 'int8array'
     * typeOf(new CustomClass(), true) === 'customclass'
     *
     * // extended behaviour - return the specific type in original case
     * // it is useful for logging and/or debugging purposes in general
     * typeOf([],                true, true) === 'Array'
     * typeOf({},                true, true) === 'Object'
     * typeOf(function(){},      true, true) === 'Function'
     * typeOf(new Date(),        true, true) === 'Date'
     * typeOf(new RegExp(),      true, true) === 'RegExp'
     *
     * // **note the differences below compared to previous example**
     * typeOf(new Int8Array(0),  true, true) === 'Int8Array'
     * typeOf(new CustomClass(), true, true) === 'CustomClass'
     *
     * @example
     * // check the type for typed arrays
     * typeOf(new Int8Array(0))         === 'typedarray'
     * typeOf(new Uint8Array(0))        === 'typedarray'
     * typeOf(new Uint8ClampedArray(0)) === 'typedarray'
     * typeOf(new Int16Array(0))        === 'typedarray'
     * typeOf(new Uint16Array(0))       === 'typedarray'
     * typeOf(new Int32Array(0))        === 'typedarray'
     * typeOf(new Uint32Array(0))       === 'typedarray'
     * typeOf(new Float32Array(0))      === 'typedarray'
     * typeOf(new Float64Array(0))      === 'typedarray'
     *
     * // check their types with specificType = true
     * typeOf(new Int8Array(0),         true) === 'int8array'
     * typeOf(new Uint8Array(0),        true) === 'uint8array'
     * typeOf(new Uint8ClampedArray(0), true) === 'uint8clampedarray'
     * typeOf(new Int16Array(0),        true) === 'int16array'
     * typeOf(new Uint16Array(0),       true) === 'uint16array'
     * typeOf(new Int32Array(0),        true) === 'int32array'
     * typeOf(new Uint32Array(0),       true) === 'uint32array'
     * typeOf(new Float32Array(0),      true) === 'float32array'
     * typeOf(new Float64Array(0),      true) === 'float64array'
     *
     * // get their constructor's names in non-converted (original) case.
     * typeOf(new Int8Array(0),         true, true) === 'Int8Array'
     * typeOf(new Uint8Array(0),        true, true) === 'Uint8Array'
     * typeOf(new Uint8ClampedArray(0), true, true) === 'Uint8ClampedArray'
     * typeOf(new Int16Array(0),        true, true) === 'Int16Array'
     * typeOf(new Uint16Array(0),       true, true) === 'Uint16Array'
     * typeOf(new Int32Array(0),        true, true) === 'Int32Array'
     * typeOf(new Uint32Array(0),       true, true) === 'Uint32Array'
     * typeOf(new Float32Array(0),      true, true) === 'Float32Array'
     * typeOf(new Float64Array(0),      true, true) === 'Float64Array'
     */
    function typeOf(object, specificType, originalCase) {
        var specific = config.specificType,
            original = config.originalCase,
            type     = typeof object,
            string   = Object.prototype.toString.call(object),
            useConstructor;

        if (typeof specificType !== 'undefined' && specificType !== null) {
            specific = specificType === true;
        }

        if (typeof originalCase !== 'undefined') {
            original = originalCase === true;
        }

        if ( ! original) {
            if (type === 'object') {
                if (object === null) {
                    type = 'null';
                } else {
                    switch (string) {
                        case '[object Date]' :
                            type = 'date';
                            break;

                        case '[object RegExp]' :
                            type = 'regexp';
                            break;

                        case '[object Error]' :
                            type = 'error';
                            break;

                        // skip default case - not needed
                    }
                }
            }

        } else {
            if (type === 'undefined') {
                type = 'Undefined';

            } else if (object === null) {
                type = 'Null';

            } else {
                switch (typeof object) {
                    case 'boolean' :
                        type = 'Boolean';
                        break;

                    case 'number' :
                        type = 'Number';
                        break;

                    case 'string' :
                        type = 'String';
                        break;

                    case 'symbol' :
                        type = 'Symbol';
                        break;

                    case 'function' :
                        type = 'Function';
                        break;

                    // skip default case - not needed
                }
            }
        }

        if ( ! specific) {
            if (object !== null && type === 'object') {
                if (string === '[object Array]') {
                    if ( ! original) {
                        type = 'array';
                    } else {
                        type = 'Array';
                    }

                } else if (string === '[object Object]') {
                    if (original) {
                        type = 'Object';
                    }

                } else if (
                    object instanceof Int8Array         ||
                    object instanceof Uint8Array        ||
                    object instanceof Uint8ClampedArray ||
                    object instanceof Int16Array        ||
                    object instanceof Uint16Array       ||
                    object instanceof Int32Array        ||
                    object instanceof Uint32Array       ||
                    object instanceof Float32Array      ||
                    object instanceof Float64Array
                ) {
                    if ( ! original) {
                        type = 'typedarray';
                    } else {
                        type = 'TypedArray';
                    }

                } else if (
                    string === '[object Boolean]' ||
                    string === '[object Number]'  ||
                    string === '[object String]'
                ) {
                    if ( ! original) {
                        type = 'object';
                    } else {
                        type = 'Object';
                    }

                } else {
                    useConstructor = true;
                }
            }
        } else {
            useConstructor = true;
        }

        if (useConstructor) {
            type = string.substring(CONSTRUCTOR_NAME_START, string.length - 1);

            if ( ! original) {
                type = type.toLowerCase();
            }
        }

        return type;
    }

    /**
     * Returns a copy of the current, global typeOf configuration.
     *
     * If this returned object is changed, there will be no effect to the actual, current typeOf configuration
     * since the returned object is an actual copy of the configuration.
     *
     * @static
     * @function getConfig
     * @memberOf js/partial/typeOf
     *
     * @returns {config} An object with configuration key=>value pairs.
     *
     * @example
     * // get the global configuration of typeOf
     * var config = typeOf.getConfig();
     *
     * // now, the config object will contain the following key=>value pairs:
     * console.log(config);
     * // {
     * //     'specificType' : false
     * //     'originalCase' : false
     * // }
     */
    typeOf.getConfig = function() {
        var conf = {},
            key;

        for (key in config) {
            conf[key] = config[key];
        }

        return conf;
    };

    /**
     * Sets the global typeOf configuration.
     *
     * @static
     * @function setConfig
     * @memberOf js/partial/typeOf
     *
     * @param {config} configuration An object with configuration key=>value pairs.
     *
     * @returns {void}
     *
     * @example
     * // set the global configuration of typeOf
     * typeOf.setConfig({
     *     specificType : true
     *     originalCase : true
     * });
     *
     * // now, the configuration of typeOf will have the following key=>value pairs with their specific values:
     * console.log(typeOf.getConfig());
     * // {
     * //     'specificType' : false
     * //     'originalCase' : false
     * // }
     */
    typeOf.setConfig = function(configuration) {
        if (typeof configuration.specificType === 'boolean') {
            config.specificType = configuration.specificType;
        }

        if (typeof configuration.originalCase === 'boolean') {
            config.originalCase = configuration.originalCase;
        }
    };

    return typeOf;
}));
