import {
  parse,
  CLOSE_PAREN,
  DIGIT,
  DIRECT_MATCH,
  LOWERCASE_LETTER,
  OPEN_PAREN,
  PLUS,
  TIMES,
} from './lexer';

test('a', () => {
  const matched = parse('a');
  expect(matched).toEqual([DIRECT_MATCH]);
});
test('[0-9]+', () => {
  const matched = parse('[0-9]+');
  expect(matched).toEqual([DIGIT, PLUS]);
});
test('[1-9]+', () => {
  const matched = parse('[1-9]+');
  expect(matched).toEqual([]);
});
test('[a-z]*', () => {
  const matched = parse('[a-z]*');
  expect(matched).toEqual([LOWERCASE_LETTER, TIMES]);
});
test('[b-z]*', () => {
  const matched = parse('[b-z]*');
  expect(matched).toEqual([]);
});
test('([a-z])*([0-9])+', () => {
  const matched = parse('([a-z])*([0-9])+');
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
