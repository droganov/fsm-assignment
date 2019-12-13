import React from 'react';
import styled from '@emotion/styled';
import { Heading, Paper } from '@rkta/ui';
import { ArrowLongDown, ArrowLongRight, Check, Cw, Cycle, Block } from '@rkta/entypo';

import {
  TEST_SUCCEED,
  TEST_FAILED,
  SKIP_TOKEN,
  REWIND_CURSOR,
  SKIP_REWIND_CURSOR,
} from '../Form/match';

const Box = styled.figure`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .event {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 4px;
    padding: 8px;
    width: 240px;
  }
  .rule {
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 24px;
    svg {
      margin: 0 8px;
      opacity: 0.64;
    }
  }
  .type {
    font-size: 12px;
  }
`;

function getStyle(type) {
  switch (type) {
    case TEST_SUCCEED:
      return { color: 'color5', Icon: Check };
    case TEST_FAILED:
      return { color: 'color2', Icon: Block };
    case REWIND_CURSOR:
      return { color: 'color12', Icon: Cycle };
    case SKIP_TOKEN:
    case SKIP_REWIND_CURSOR:
      return { color: 'color8', Icon: Cw };
    default:
      return { color: 'color1', Icon: ArrowLongDown };
  }
}

export const Graph = ({ data = [] }) => {
  if (!data.length) return null;
  console.log('data', data);
  return (
    <Box>
      <Heading level={2}>Graph</Heading>
      {data.map(({ char, token, type }, index) => {
        const { color, Icon } = getStyle(type);
        return (
          <Paper className="event" key={index} bgColor={color}>
            <div className="rule">
              {token}
              <ArrowLongRight size={16} block />
              {char}
            </div>
            <div className="type">{type}</div>
            <Icon size={16} />
          </Paper>
        );
      })}
    </Box>
  );
};
