import React from "react";
import { List, Input, Divider } from "@rkta/ui";
import RktaForm from "rkta-form";
import flow from "lodash/flow";
import { match } from "./match";

const addMatch = ({ expression, content }) => ({
  expression,
  content,
  data: match(expression, content),
});

export const Form = ({ onChange }) => (
  <RktaForm onFormChange={flow(addMatch, onChange)}>
    <List outline={3} outlineColor="primary">
      <Input name="expression" caption="Expression" />
      <Divider horizontalSpace={16} />
      <Input name="content" caption="Content" />
    </List>
  </RktaForm>
);
