import React, { ReactNode } from "react";
import styled from "styled-components";
import { Col, Icon, Row } from "antd";

interface Props {
  text: ReactNode;
}

const Prompt = styled.p`
  text-align:center;
  font-size:20px;
  color: #FFFFFF;
  margin-bottom: 50px;
  margin-top: 0px;
  padding: 0px;
`;

export const PromptComponent = (props: Props) => (
  <Row>
    <Col span={5}/>
    <Col span={1}>
      <Icon type="check-square-o" style={{fontSize: 30, color: "#FFFFFF"}}/>
    </Col>
    <Col span={12}>
      <Prompt>{props.text}</Prompt>
    </Col>
  </Row>
);
