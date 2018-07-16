import styled from "styled-components";
import { default as React, ReactNode } from "react";

export const Prompt = styled.span`
    float: left;
    width: 120px;
    color: darkgray;
   
`;

export const Content = styled.span`

`;

export const Container = styled.div`
    margin-bottom: 1em;
`;

export const ID_PREFIX = "missions.missionDetail.";

export function DefinitionItem(props: { prompt: ReactNode, children: ReactNode }) {
  return <Container>
    <Prompt>{props.prompt}</Prompt>
    <Content>{React.Children.count(props.children) ? props.children : <>&emsp;</>}</Content>
  </Container>
}
