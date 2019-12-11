const compareNocase = (a, b) => a.toLowerCase() === b.toLowerCase();
const countMatches = (key, string) => {
  let results = 0;
  while (key.toLowerCase() === string.substr(results, 1).toLowerCase()) {
    results++;
  }
  return results;
}

export function match(expression, content) {
  let step = 0;
  let results = [];
  let isComplete = false;

  function setComplete() {
    isComplete = true;
  }
  function abort() {
    setComplete();
    results = [];
  }
  function defaultRule({ key, matchKey }) {
    if (compareNocase(key, matchKey)) results.push({ key, step, matchKey, recursion: 0 });
    else if (results.length && results.length < expression.length) abort();
  }

  const makeQuantifierRule = minMatches => ({ key, matchKey }) => {
    const lastResult = results[results.length - 1];
    if (!lastResult) return abort();
    const subContent = content.substr(step);
    const recursion = countMatches(lastResult.key, subContent);
    if (recursion < minMatches) return abort();
    if (recursion) results.push({ key, step: lastResult.step, matchKey, recursion });
  };
  
  function getRule(matchKey) {
    switch (matchKey) {
      case '+':
        return makeQuantifierRule(1);
      case '*':
        return makeQuantifierRule(0);
      default:
        return defaultRule;
    }
  }
  // NOTE: normally we want a tests factory here, for now it's just a shallow runner
  function next() {
    const key = content.charAt(step);
    const matchKey = expression.charAt(results.length);
    const rule = getRule(matchKey);
    rule({ key, matchKey });
    step++;
    if (content.length <= step) setComplete();
  }
  while (!isComplete) {
    next();
  }
  return results;
}