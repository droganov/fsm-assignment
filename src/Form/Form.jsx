import React from 'react';
import { List, Input, Divider } from '@rkta/ui';
import RktaForm from 'rkta-form';
import flow from 'lodash/flow';
import { match } from './match';

const addMatch = ({ expression, content }) => ({
  expression,
  content,
  data: match(expression, content, true),
});

export const Form = ({ onChange }) => (
  <RktaForm onFormChange={flow(addMatch, onChange)}>
    <List outline={3} outlineColor="primary">
      <Input autoComplete="off" name="expression" caption="Expression" />
      <Divider horizontalSpace={16} />
      <Input autoComplete="off" name="content" caption="Content" />
    </List>
  </RktaForm>
);
