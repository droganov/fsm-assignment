import React from "react";
import { Heading } from "@rkta/ui";

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
  const start = data[0].step;
  const lastItem = data[data.length - 1];
  const stop = lastItem.step + lastItem.recursion + 1;
  console.log('data', data, start, stop);
  return { start, stop };
};

export const Results = ({ content, data }) => {
  if (!content) return null;
  return (
    <section>
      <Heading level={2}>Results</Heading>
      {data.length ? <Marqee content={content} {...getBounds(data)} /> : "No matches"}
    </section>
  );
};
