'use strict';

const parse = require('./parse');

test('Usage test', () => {
  const myname = 'leecjson';
  const src = `<img src="@ref(./b.png)" /> <img src="@ref(./c.png)" /> <img src="@ref(happy)" />`;

  // expect output
  let e = '\"\"'; 
  e += ' + ' + JSON.stringify(`<img src="`);
  e += ' + ' + myname;
  e += ' + ' + JSON.stringify(`" /> <img src="`);
  e += ' + ' + myname;
  e += ' + ' + JSON.stringify(`" /> <img src="`);
  e += ' + ' + myname;
  e += ' + ' + JSON.stringify(`" />`);
  expect(parse(src, ref => myname)).toBe(e);
});

test('Specific test A', () => {
  const src = `A@ref(./b.png)@ref(./c.png)@ref(zz)`; // @ref are end of src

  // expect output
  let e = '\"\"'; 
  e += ' + ' + JSON.stringify('A');
  e += ' + ' + './b.png';
  e += ' + ' + './c.png';
  e += ' + ' + 'zz';
  expect(parse(src, ref => ref)).toBe(e);
});

test('Specific test B', () => {
  const src = `@ref(./b.png)@ref(./c.png)@ref(zz)A`; // @ref are front of src

  // expect output
  let e = '\"\"'; 
  e += ' + ' + './b.png';
  e += ' + ' + './c.png';
  e += ' + ' + 'zz';
  e += ' + ' + JSON.stringify('A');
  expect(parse(src, ref => ref)).toBe(e);
});

test('Error test A', () => {
  const src = `@ref(./b.png)@ref(./c.png A`; // Should throw an Error
  expect(parse.bind(undefined, src, ref => ref)).toThrow(Error);
});

test('Error test B', () => {
  const src = `... @ref() ... @ref(./c.png) A`; // Should throw an Error
  expect(parse.bind(undefined, src, ref => console.log(ref))).toThrow(Error);
});


// test('parse2', () => {
//   const myname = 'leecjson';
//   const src = `<img src="@ref(./b.png)" /> <img src="@ref(./c.png)" /> <img src="@ref(happy)" />`;

//   let expectOutput = '\"\"';
//   expectOutput += ' + ' + JSON.stringify(`<img src="`);
//   expectOutput += ' + ' + myname;
//   expectOutput += ' + ' + JSON.stringify(`" /> <img src="`);
//   expectOutput += ' + ' + myname;
//   expectOutput += ' + ' + JSON.stringify(`" /> <img src="`);
//   expectOutput += ' + ' + myname;
//   expectOutput += ' + ' + JSON.stringify(`" />`);
//   expect(parse(src, ref => myname)).toBe(expectOutput);
// });