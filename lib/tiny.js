'use strict';


var assign = require('lodash/object/assign');
var isString = require('lodash/lang/isString');
var omit = require('lodash/object/omit');
var toArray = require('lodash/lang/toArray');


/**
 * Return a clone object with this object attribute included new attributes
 * @this {Object}
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
  var attrsList = toArray(arguments);
  /** @constant {Object} */
  var attrs = assign.apply(null, [{}, this].concat(attrsList));

  return immut(attrs);
}

/**
 * Return a clone object with omitted given attributes
 * @this {Object}
 * @param {(...String|String[])} - The keys to omit from object
 * @return {object} - A new immutable object
 * @private
 */
function unset() {
  /** @constant {String[]} */
  var attrsToOmit = isString(arguments[0]) ? toArray(arguments) : (arguments[0] || []);
  /** @constant {Object} */
  var attrs = omit(this, attrsToOmit);

  return immut(attrs);
}

/**
 * Add immutable utilities functions
 * @param {Object} attrs - The immutable object
 */
function immut(attrs) {
  return Object.freeze(Object.defineProperties(attrs, {
    'delete': {
      configurable: true,
      enumerable: false,
      value: unset,
      writable: true
    },
    'new': {
      configurable: true,
      enumerable: false,
      value: set,
      writable: true
    }
  }));
}

/**
 * Immutable empty object
 * @type {Object}
 */
module.exports = immut({});
