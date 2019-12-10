import React from 'react';

import { match } from './fsm/match';

function App() {
  const extression = 'a+';
  const content = 'aas';
  console.log('match', match(extression, content));
  return (
    <div>
      Lexer
    </div>
  );
}

export default App;
