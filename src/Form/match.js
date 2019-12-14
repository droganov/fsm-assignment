import last from 'lodash/last';
import { tokenize, TIMES } from './lexer';
import { makeRule } from './makeRule';
import { rewindCursor } from './rewindCursor';

export const TEST_FAILED = 'TEST_FAILED';
export const TEST_OK = 'TEST_OK';
export const SKIP_TOKEN = 'SKIP_TOKEN';
export const REWIND_CURSOR = 'REWIND_CURSOR';
export const SKIP_REWIND_CURSOR = 'SKIP_REWIND_CURSOR';
export const END_OF_INPUT = 'END_OF_INPUT';

export function match(expression, input, verbose) {
  const tokens = tokenize(expression);
  const rules = tokens.map(makeRule);

  let cursor = 0;
  let rewindedFrom = null;
  let caret = 0;
  let opLog = [];

  let expressionComplete = false;
  let evaluationComplete = false;

  const getChar = () => input.charAt(caret);
  const getRule = () => rules[cursor];
  const getToken = () => tokens[cursor];

  const hasReacheTheEnd = () => !getChar() || !getRule();
  const isSuccessful = () => evaluationComplete || (expressionComplete && hasReacheTheEnd());
  const isFailed = () => !expressionComplete && hasReacheTheEnd();
  const isEmpty = () => !tokens.length || !input.length;

  function logOperation(event) {
    opLog.push(event);
  }

  function next() {
    const char = getChar();
    const token = getToken();
    const rule = getRule();

    const action = rule(char);

    switch (action.type) {
      case TEST_FAILED:
        const nextToken = tokens[cursor + 1];
        if (rewindedFrom) {
          caret = rewindedFrom.caret - 1;
          cursor = rewindedFrom.cursor;
          rewindedFrom = null;
        } else if (nextToken === TIMES) {
          caret--;
        } else {
          cursor = -1;
        }
        break;
      case SKIP_TOKEN:
        caret--;
        break;
      case REWIND_CURSOR:
        rewindedFrom = { caret, cursor };
        cursor = rewindCursor(tokens, cursor);
        caret--;
        break;
      case TEST_OK:
      case SKIP_REWIND_CURSOR:
      default:
        break;
    }

    logOperation({ char, type: action.type, token, cursor, caret });

    if (token === last(tokens)) expressionComplete = true;
    cursor++;
    loopLimit++;
    caret++;
  }
  let loopLimit = 0;

  function canContinue() {
    const isHanging = loopLimit > input.length * 20;
    const result = !isHanging && !isFailed() && !isEmpty() && !isSuccessful();
    return result;
  }

  while (canContinue()) next();

  const result = verbose ? opLog : isSuccessful() && !isFailed() && !isEmpty();
  return result;
}
