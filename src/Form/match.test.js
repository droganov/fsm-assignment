import { match } from './match';

test('a in a', () => {
  const matched = match('a', 'a');
  const expected = [
    {key: 'a', step: 0, matchKey: 'a', recursion: 0 },
  ];
  expect(matched).toEqual(expected);
});
test('a in aa', () => {
  const matched = match('a', 'aa');
  const expected = [
    {key: 'a', step: 0, matchKey: 'a', recursion: 0 },
  ];
  expect(matched).toEqual(expected);
});
test('a in ba', () => {
  const matched = match('a', 'ba');
  const expected = [
    {key: 'a', step: 1, matchKey: 'a', recursion: 0 },
  ];
  expect(matched).toEqual(expected);
});
test('1 in 012', () => {
  const matched = match('1', '012');
  const expected = [
    {key: '1', step: 1, matchKey: '1', recursion: 0 },
  ];
  expect(matched).toEqual(expected);
});
test('+ in 123', () => {
  const matched = match('+', '123');
  const expected = [];
  expect(matched).toEqual(expected);
});
test('a+ in aaab', () => {
  const matched = match('a+', 'aaab');
  const expected = [
    {key: 'a', step: 0, matchKey: 'a', recursion: 0 },
    {key: 'a', step: 0, matchKey: '+', recursion: 2 },
  ];
  expect(matched).toEqual(expected);
});
test('a+ in ab', () => {
  const matched = match('a+', 'ab');
  const expected = [];
  expect(matched).toEqual(expected);
});
test('a* in aaab', () => {
  const matched = match('a*', 'aaab');
  const expected = [
    {key: 'a', step: 0, matchKey: 'a', recursion: 0 },
    {key: 'a', step: 0, matchKey: '*', recursion: 2 },
  ];
  expect(matched).toEqual(expected);
});
test('a* in ab', () => {
  const matched = match('a*', 'ab');
  const expected = [
    {key: 'a', step: 0, matchKey: 'a', recursion: 0 },
  ];
  expect(matched).toEqual(expected);
});