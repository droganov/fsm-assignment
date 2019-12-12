export const CLOSE_PAREN = ')';
export const DIGIT = '[0-9]';
export const DIRECT_MATCH = 'DIRECT_MATCH';
export const LOWERCASE_LETTER = '[a-z]';
export const OPEN_PAREN = '(';
export const PLUS = '+';
export const TIMES = '*';

// export const CLOSE_PAREN = Symbol(')');
// export const DIGIT = Symbol('[0-9]');
// export const DIRECT_MATCH = Symbol('DIRECT_MATCH');
// export const LOWERCASE_LETTER = Symbol('[a-z]');
// export const OPEN_PAREN = Symbol('(');
// export const PLUS = Symbol('+');
// export const TIMES = Symbol('*');

const VALID_BRACKET_EXPRESSIONS = [DIGIT, LOWERCASE_LETTER];

export function parse(expression) {
  let step = -1;
  let isComplete = false;
  let bracketBuffer = null;
  let resultBuffer = [];

  const hasOpenBracket = () => bracketBuffer !== null;

  function setComplete() {
    if (hasOpenBracket()) resultBuffer = [];
    isComplete = true;
  }

  function handleClosingBracket() {
    const expression = VALID_BRACKET_EXPRESSIONS.find(item => item === bracketBuffer.join(''));
    if (!expression) return setComplete();
    resultBuffer.push(expression);
    bracketBuffer = null;
  }

  function next() {
    step++;
    if (step === expression.length - 1) setComplete();
    const char = expression.charAt(step);
    if (hasOpenBracket()) {
      bracketBuffer.push(char);
      if (char === ']') handleClosingBracket();
      return;
    }
    switch (char) {
      case '[':
        bracketBuffer = [char];
        break;
      case '(':
        resultBuffer.push(OPEN_PAREN);
        break;
      case ')':
        resultBuffer.push(CLOSE_PAREN);
        break;
      case '+':
        resultBuffer.push(PLUS);
        break;
      case '*':
        resultBuffer.push(TIMES);
        break;
      default:
        resultBuffer.push(DIRECT_MATCH);
        break;
    }
  }
  while (!isComplete) next();
  return resultBuffer;
}
