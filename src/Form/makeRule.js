import { CLOSE_PAREN, DIGIT, LOWERCASE_LETTER, OPEN_PAREN, PLUS, TIMES } from './lexer';
import { SKIP_TOKEN, REWIND_CURSOR, SKIP_REWIND_CURSOR, TEST_OK, TEST_FAILED } from './match';

const assert = (check, type) => (check ? { type } : { type: TEST_FAILED });
const constant = type => () => ({ type });

export function makeRule(token) {
  switch (token) {
    case CLOSE_PAREN:
    case OPEN_PAREN:
      return constant(SKIP_TOKEN);
    case PLUS:
      return constant(REWIND_CURSOR);
    case TIMES:
      return constant(SKIP_REWIND_CURSOR);
    case DIGIT:
      return char => assert(char >= '0' && char <= '9', TEST_OK);
    case LOWERCASE_LETTER:
      return char => assert(char >= 'a' && char <= 'z', TEST_OK);
    default:
      return char => assert(char === token, TEST_OK);
  }
}
