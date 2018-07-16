import { SvgImg } from "../Common/SvgImg";
import { Link } from 'react-router-dom';
import React from 'react';
import styled from "styled-components";

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  height: 60px;
  
  text {
    fill: ${(props: LogoItemProps) => props.textColor || "white"};
    font-size: 68px;
  }
  
`;

interface LogoItemProps {
  textColor?: string;
}

export function LogoItem(props: LogoItemProps) {
  return <Link to={"/"}>
    <CenterDiv {...props}>
      <SvgImg width={120} height={35} filePath={"tag_x00_logo_landscape_with_texts.svg"}/>
    </CenterDiv>
  </Link>;
}
