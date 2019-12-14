import { match } from './match';

const case1 = 'a';
const string1 = 'a';
test(case1, () => {
  const matched = match(case1, string1);
  const expected = new RegExp(case1).test(string1);
  expect(matched).toEqual(expected);
});

const case2 = 'a';
const string2 = 'aa';
test(case2, () => {
  const matched = match(case2, string2);
  const expected = new RegExp(case2).test(string2);
  expect(matched).toEqual(expected);
});

const case3 = 'a';
const string3 = 'ba';
test(case3, () => {
  const matched = match(case3, string3);
  const expected = new RegExp(case3).test(string3);
  expect(matched).toEqual(expected);
});

const case4 = '1';
const string4 = '012';
test(case4, () => {
  const matched = match(case4, string4);
  const expected = new RegExp(case4).test(string4);
  expect(matched).toEqual(expected);
});

const case5 = '[a-z]';
const string5 = '123sz2';
test(case5, () => {
  const matched = match(case5, string5);
  const expected = new RegExp(case5).test(string5);
  expect(matched).toEqual(expected);
});

const case6 = '[0-9]';
const string6 = '123sz2';
test(case6, () => {
  const matched = match(case6, string6);
  const expected = new RegExp(case6).test(string6);
  expect(matched).toEqual(expected);
});

const case7 = 'a+';
const string7 = 'b';
test(case7, () => {
  const matched = match(case7, string7);
  const expected = new RegExp(case7).test(string7);
  expect(matched).toEqual(expected);
});

const case8 = 'a+';
const string8 = 'ab';
test(case8, () => {
  const matched = match(string8, string8);
  const expected = new RegExp(case8).test(string8);
  expect(matched).toEqual(expected);
});

const case9 = 'a*';
const string9 = 'aaab';
test(case9, () => {
  const matched = match(case9, string9);
  const expected = new RegExp(case9).test(string9);
  expect(matched).toEqual(expected);
});

const case10 = 'a*';
const string10 = 'b';
test(case10, () => {
  const matched = match(case10, string10);
  const expected = new RegExp(case10).test(string10);
  expect(matched).toEqual(expected);
});

const case11 = 'a*';
const string11 = 'ab';
test(case11, () => {
  const matched = match(case11, string11);
  const expected = new RegExp(case11).test(string11);
  expect(matched).toEqual(expected);
});

const case12 = '[a-z]+';
const string12 = 'ab';
test(case12, () => {
  const matched = match(case12, string12);
  const expected = new RegExp(case12).test(string12);
  expect(matched).toEqual(expected);
});

const case13 = '(bcd)';
const string13 = 'abcde';
test(case13, () => {
  const matched = match(case13, string13);
  const expected = new RegExp(case13).test(string13);
  expect(matched).toEqual(expected);
});

const case14 = '(bcd)+(123)';
const string14 = 'bcd123';
test(case14, () => {
  const matched = match(case14, string14);
  const expected = new RegExp(case14).test(string14);
  expect(matched).toEqual(expected);
});

const case15 = '(ab([0-9]+)cd)';
const string15 = 'ab1234cdbcd123e';
test(case15, () => {
  const matched = match(case15, string15);
  const expected = new RegExp(case15).test(string15);
  expect(matched).toEqual(expected);
});

const case16 = '(';
test(case16, () => {
  const matched = match(case16, '');
  expect(matched).toEqual(false);
});

const case17 = '[0-9]';
const string17 = 'as12+';
test(case17, () => {
  const matched = match(case17, string17);
  const expected = new RegExp(case17).test(string17);
  expect(matched).toEqual(expected);
});

test('empty case', () => {
  const matched = match('', '');
  expect(matched).toEqual(false);
});

const case18 = '(a)+(b)+';
const string18 = 'aabbc';
test(case18, () => {
  const matched = match(case18, string18);
  const expected = new RegExp(case18).test(string18);
  expect(matched).toEqual(expected);
});

// c 0 1 0
// s 0 1 1
//   a b
