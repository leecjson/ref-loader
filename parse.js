'use strict';

const startMark = '@ref('
const endMark = ')'

module.exports = parse;

/**
 * 
 * @param {string} src 
 */
function parse(src, pred) {
  let ret = '\"\"', pos = 0;
  while (pos < src.length) {
    const k = src.indexOf(startMark, pos);
    if (k === -1) {
      break;
    }
    ret += ' + ' + JSON.stringify(src.slice(pos, k));
    const u = k + startMark.length;
    const v = src.indexOf(endMark, u)
    if (v === -1) {
      throw new Error(`@ref should close with ')'`)
    }
    const ref = src.slice(u, v);
    if (ret.length === 0) {
      throw new Error('@ref path should not be empty')
    }
    ret += ' + ' + pred(ref);
    pos = v + 1;
  }
  if (pos < src.length) {
    ret += ' + ' + JSON.stringify(src.slice(pos, src.length));
  }
  return ret;
}

// const str = `<img src='@ref(./b.png)' /> <img src='@ref(./c.png)' /> <img src='@ref()' />`;
// const ret = parse(str, ref => {
//   //console.log(ref);
//   return `require("${ref}")`;
// });
// console.log(ret);