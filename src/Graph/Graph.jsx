import React from "react";
import styled from "@emotion/styled";
import { Heading, Paper } from "@rkta/ui";
import { ArrowLongDown, Cw } from "@rkta/entypo";

const Box = styled.figure`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 4px;
  }
`;

export const Graph = ({ data = [] }) => {
  if (!data.length) return null;
  return (
    <Box>
      <Heading level={2}>Graph</Heading>
      {data.map(({ matchKey, recursion }, index) => (
        <Paper
          key={index}
          bgColor={recursion ? "color12" : "color5"}
          round
          size={80}
        >
          {recursion ? (
            <>
              <Cw size={16} />
              {matchKey}
              {recursion}
            </>
          ) : (
            <>
              {matchKey}
              <ArrowLongDown size={16} />
            </>
          )}
        </Paper>
      ))}
    </Box>
  );
};
