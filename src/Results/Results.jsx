import React from 'react';
import { Heading } from '@rkta/ui';

import { TEST_OK } from '../Form/match';

const Marqee = ({ content, start, stop }) => {
  const head = content.substring(0, start);
  const body = content.substring(start, stop);
  const tail = content.substring(stop);
  return (
    <>
      {head}
      {body && <em>{body}</em>}
      {tail}
    </>
  );
};

const getBounds = data => {
  const start = data[0].caret;
  const lastItem = data[data.length - 1];
  const stop = lastItem.caret + 1;
  return { start, stop };
};

const successful = ({ type }) => type === TEST_OK;

export const Results = ({ content, data }) => {
  if (!content) return null;
  const renderData = data.filter(successful);
  return (
    <section>
      <Heading level={2}>Results</Heading>
      {renderData.length ? <Marqee content={content} {...getBounds(renderData)} /> : 'No matches'}
    </section>
  );
};
