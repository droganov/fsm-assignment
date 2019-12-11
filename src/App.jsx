import React, { useState } from "react";
import { Provider, Heading } from "@rkta/ui";
import styled from "@emotion/styled";
import { Form } from "./Form";

const Box = styled.main`
  h1 {
    text-align: center;
  }
  form {
    max-width: 400px;
    margin: auto;
  }
`;

function App() {
  const [state, setState] = useState([]);
  console.log('state', state);
  return (
    <Provider>
      <Box>
        <Heading level={1}>FSM</Heading>
        <Form onChange={setState} />
      </Box>
    </Provider>
  );
}

export default App;
