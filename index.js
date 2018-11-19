'use strict';

//const loaderUtils = require('loader-utils');
const parse = require('./parse');

module.exports = function(src, map, meta) {
  //const options = loaderUtils.getOptions(this);
  const callback = this.async();
  try {
    const product = `module.exports = ${parse(src, ref => `require("${ref}")`)}`;
    callback(null, product, map, meta);
  } catch (e) {
    callback(e);
  }
};