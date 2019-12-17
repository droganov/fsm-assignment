export const CLOSE_PAREN = ')';
export const DIGIT = '[0-9]';
export const DIRECT_MATCH = 'DIRECT_MATCH';
export const LOWERCASE_LETTER = '[a-z]';
export const OPEN_PAREN = '(';
export const PLUS = '+';
export const TIMES = '*';

const VALID_BRACKET_EXPRESSIONS = [DIGIT, LOWERCASE_LETTER];

export function tokenize(inputString = '') {
  const expression = [...inputString];
  let step = -1;
  let isComplete = !expression.length;
  let bracketBuffer = null;
  let resultBuffer = [];
  let countParen = 0;

  const hasOpenBracket = () => bracketBuffer !== null;

  function abort() {
    resultBuffer = [];
    isComplete = true;
  }
  function setComplete() {
    if (hasOpenBracket()) resultBuffer = [];
    isComplete = true;
  }

  function handleClosingBracket() {
    const expression = VALID_BRACKET_EXPRESSIONS.find(item => item === bracketBuffer.join(''));
    if (!expression) return abort();
    resultBuffer.push(expression);
    bracketBuffer = null;
  }

  function next() {
    step++;
    if (step === expression.length - 1) setComplete();
    const char = expression[step];
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
        countParen++;
        resultBuffer.push(OPEN_PAREN);
        break;
      case ')':
        countParen--;
        if (countParen < 0) return abort();
        resultBuffer.push(CLOSE_PAREN);
        break;
      case '+':
        if (resultBuffer.length) resultBuffer.push(PLUS);
        else abort();
        break;
      case '*':
        if (resultBuffer.length) resultBuffer.push(TIMES);
        else abort();
        break;
      default:
        resultBuffer.push(char);
        break;
    }
  }
  while (!isComplete) next();
  if (countParen !== 0) abort();
  return resultBuffer;
}
