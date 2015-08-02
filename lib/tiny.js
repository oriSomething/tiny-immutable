'use strict';


var assign = require('lodash/object/assign');
var isString = require('lodash/lang/isString');
var mapValues = require('lodash/object/mapValues');
var omit = require('lodash/object/omit');
var slice = require('lodash/array/slice');

/**
 * Return a clone object with this object attribute included new attributes
 * @param {...Object} attrsList - List of attributes to assign to a new object
 * @return {object} - A new immutable object
 * @private
 * @example
 * // No arguments
 * var y = x.new(); // y !== x
 * // With attributes
 * var y = x.new({ z: 1 }) // y.z === 1
 */
function set() {
  /** @constant {Object[]} */
  var attrsList = [{}].concat(slice(arguments));

  return assign.apply(null, attrsList);
}

/**
 * Return a clone object with omitted given attributes
 * @param {Object} attrs - Current object attributes
 * @param {(...String|String[])} - The keys to omit from object
 * @return {object} - A new immutable object
 * @private
 */
function unset(attrs) {
  /** @constant {String[]} */
  var attrsToOmit = isString(arguments[1]) ? slice(arguments, 1) : (arguments[1] || []);

  return omit(attrs, attrsToOmit);
}

/**
 * Add immutable utilities functions
 * @param {Object} attrs - The immutable object
 * @param {Object} fns - Functions to tiny immutable object
 * @return {Object} - Tiny immutable object
 */
function immut(attrs, fns) {
  fns = fns || {
    'set': set,
    unset: unset
  };

  return Object.freeze(Object.defineProperties(attrs, mapValues(fns, function(fn) {
    return {
      configurable: true,
      enumerable: false,
      value: function() {
        var args = [this].concat(slice(arguments));
        return immut(fn.apply(null, args));
      },
      writable: true
    };
  })));
}

/**
 * Immutable empty object
 * @type {Object}
 */
module.exports = immut({});
