'use strict';


var assign = require('lodash/object/assign');
var constant = require('lodash/utility/constant');
var isString = require('lodash/lang/isString');
var mapValues = require('lodash/object/mapValues');
var omit = require('lodash/object/omit');
var toArray = require('lodash/lang/toArray');


/**
 * Map attributes to object descriptors of get functions.
 * Used for throw error when someone try to re-assign value
 * @param  {Object} attrs
 * @return {Object} - Object descriptors of getters for the values
 * @private
 */
function mapValuesToGetDescriptors(attrs) {
  return mapValues(attrs, function(value) {
    return {
      configurable: true,
      enumerable: true,
      get: constant(value)
    };
  });
}

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
function immutableNew() {
  /** @constant {Object[]} */
  var attrsList = toArray(arguments);
  /** @constant {Object} */
  var attrs = assign.apply(null, [{}, this].concat(attrsList));
  /** @constant {Object} Descriptors of the new objects */
  var descriptors = mapValuesToGetDescriptors(attrs);

  return addImmutableUtils(Object.defineProperties({}, descriptors));
}

/**
 * Return a clone object with omitted given attributes
 * @this {Object}
 * @param {(...String|String[])} - The keys to omit from object
 * @return {object} - A new immutable object
 * @private
 */
function immutableDelete() {
  /** @constant {String[]} */
  var attrsToOmit = isString(arguments[0]) ? toArray(arguments) : (arguments[0] || []);
  /** @constant {Object} */
  var attrs = omit(this, attrsToOmit);
  /** @constant {Object} Descriptors of the new objects */
  var descriptors = mapValuesToGetDescriptors(attrs);

  return addImmutableUtils(Object.defineProperties({}, descriptors));
}

/**
 * Add immutable utilities functions
 * @param {Object} obj - The immutable object
 */
function addImmutableUtils(obj) {
  return Object.defineProperties(obj, {
    'delete': {
      configurable: true,
      enumerable: false,
      value: immutableDelete,
      writable: true
    },
    'new': {
      configurable: true,
      enumerable: false,
      value: immutableNew,
      writable: true
    }
 });
}

/**
 * Immutable empty object
 * @type {Object}
 */
module.exports = addImmutableUtils({});
