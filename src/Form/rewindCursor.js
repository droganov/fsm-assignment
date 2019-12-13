import { CLOSE_PAREN, OPEN_PAREN } from './lexer';
export function rewindCursor(tokens, cursor) {
  const prevCursor = cursor - 1;
  const prevToken = tokens[prevCursor];
  if (prevToken !== CLOSE_PAREN) return prevCursor - 1;
  let parenCount = 0;
  const reversedTokens = tokens.slice(0, cursor).reverse();
  const nextCursor =
    reversedTokens.findIndex(currentToken => {
      if (currentToken === CLOSE_PAREN) parenCount++;
      if (currentToken === OPEN_PAREN) parenCount--;
      return currentToken === OPEN_PAREN && parenCount === 0;
    }) - reversedTokens.length;
  return nextCursor;
}
