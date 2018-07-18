import React from 'react';
import { Icon as AntdIcon, Layout } from 'antd';
import { Inject } from "react.di";
import { UiStore } from "../../stores/UiStore";
import { action } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import { LanguageSelector } from "../LanguageSelector";
import { LeftDiv, MobileNavContainer, NavItem, RightDiv, Row } from "./Layout";
import { NavbarUserIndicator } from "./NavbarUserIndicator";

const AntdHeader = Layout.Header;

interface Props {

}

interface PaddingProps {
  padding: number;
}

const Header = styled(AntdHeader)`
  padding: 0 ${(props: PaddingProps) => props.padding}px 0 ${(props: PaddingProps) => props.padding}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
`;

const Container = styled.div`
  & > * {
  margin-left: 16px;
  }
  display: flex;
  
`;

const Icon = styled(AntdIcon)`
margin-left: 4px;
  &:hover {
  cursor:pointer;
  }

`;


@observer
export class MainHeader extends React.Component<Props, {}> {

  @Inject uiStore: UiStore;

  dropdownContainerRef = React.createRef() as any;


  render() {

    return <Row>
      <LeftDiv>
        <MobileNavContainer>
          <NavbarUserIndicator/>
          <LanguageSelector/>
        </MobileNavContainer>
      </LeftDiv>
      <RightDiv>
        <NavItem>
          <LanguageSelector/>
        </NavItem>
        <NavItem>
          <NavbarUserIndicator/>
        </NavItem>
      </RightDiv>
    </Row>;

    // return <Header padding={this.uiStore.contentSidePadding}>
    //   <Container>
    //     <div>
    //
    //     </div>
    //     <div>
    //
    //     </div>
    //   </Container>
    //   <Container>
    //     <UserIndicator/>
    //     <LanguageSelector/>
    //   </Container>
    // </Header>
  }
}
