import { tokenize, CLOSE_PAREN, DIGIT, LOWERCASE_LETTER, OPEN_PAREN, PLUS, TIMES } from './lexer';

test('+', () => {
  const matched = tokenize('+');
  expect(matched).toEqual([]);
});
test('(ab[0-9]+', () => {
  const matched = tokenize('(ab[0-9]+');
  expect(matched).toEqual([]);
});
test('*', () => {
  const matched = tokenize('*');
  expect(matched).toEqual([]);
});
test('abcd', () => {
  const matched = tokenize('abcd');
  expect(matched).toEqual(['a', 'b', 'c', 'd']);
});
test('[0-9]+', () => {
  const matched = tokenize('[0-9]+');
  expect(matched).toEqual([DIGIT, PLUS]);
});
test('[1-9]+', () => {
  const matched = tokenize('[1-9]+');
  expect(matched).toEqual([]);
});
test('[a-z]', () => {
  const matched = tokenize('[a-z]');
  expect(matched).toEqual([LOWERCASE_LETTER]);
});
test('[a-z]*', () => {
  const matched = tokenize('[a-z]*');
  expect(matched).toEqual([LOWERCASE_LETTER, TIMES]);
});
test('[b-z]*', () => {
  const matched = tokenize('[b-z]*');
  expect(matched).toEqual([]);
});
test('[]][*', () => {
  const matched = tokenize('[]][*');
  expect(matched).toEqual([]);
});
test('())', () => {
  const matched = tokenize('())');
  expect(matched).toEqual([]);
});
test('([a-z])*([0-9])+', () => {
  const matched = tokenize('([a-z])*([0-9])+');
  expect(matched).toEqual([
    OPEN_PAREN,
    LOWERCASE_LETTER,
    CLOSE_PAREN,
    TIMES,
    OPEN_PAREN,
    DIGIT,
    CLOSE_PAREN,
    PLUS,
  ]);
});
