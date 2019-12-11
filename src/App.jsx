import React, { useState } from "react";
import { Provider, Heading } from "@rkta/ui";
import styled from "@emotion/styled";
import { Form } from "./Form";
import { Results } from "./Results";
import { Graph } from "./Graph";

const Box = styled.main`
  h1, section {
    text-align: center;
  }
  form {
    max-width: 400px;
    margin: auto;
  }
  em {
    background-color: ${({ theme }) => theme.color.color3};
    border-radius: 3px;
  }
`;

function App() {
  const [state, setState] = useState([]);
  return (
    <Provider>
      <Box>
        <Heading level={1}>FSM</Heading>
        <Form onChange={setState} />
        <Results {...state} />
        <Graph {...state} />
      </Box>
    </Provider>
  );
}

export default App;
