import styled from "styled-components";
import { default as React, ReactNode } from "react";
import If from "../Util/If";

export const Prompt = styled.span`
    float: left;
    width: 150px;
    color: darkgray;
`;

export const Content = styled.span`

`;

export const Container = styled.div`
    margin-bottom: 1em;
`;

export function DefinitionItem(props: { prompt: ReactNode, children: ReactNode }) {
  return <Container>
    <Prompt>{props.prompt}</Prompt>
    <Content>
      <If condition={React.Children.count(props.children) > 0} else={<>&emsp;</>}>
        {props.children}
      </If>
    </Content>
  </Container>;
}
