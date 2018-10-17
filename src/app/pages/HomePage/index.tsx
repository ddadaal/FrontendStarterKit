import React from "react";
import { Link } from "react-router-dom";
import { layoutConstants } from "../../layouts/components/constants";
import styled from "styled-components";
import background from "../../../assets/background/1.png";
import { Col, Row } from "antd";
import CenterContainer from "./CenterContainer";
import { UiStore } from "../../stores/UiStore";
import { Inject } from "react.di";
import { UserStore } from "../../stores/UserStore";
import { RouterStore } from "../../routing/RouterStore";
import { observer } from "mobx-react";

interface Props {

}

const HomePageContainer = styled.div`
min-height: 800px;
`;

const titleShowcaseHeight = 500;

const BannerContainer = styled.div`
  position: relative;
  height: ${titleShowcaseHeight}px;
  width: 100%;
  background-color: ${layoutConstants.headerBackgrounColor};
`;

const ParticlesContainer = styled.div`
  position: absolute;
  height: ${titleShowcaseHeight}px;
  width: 100%;
  
  z-index: 3;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  height: ${titleShowcaseHeight}px;
  width: 100%;
  
  & > img {
    float: right;
    height: ${titleShowcaseHeight}px;
   
  }
  
  z-index: 1;
`;

const TitleShowcase = styled(CenterContainer)`
  height: ${titleShowcaseHeight}px;
  width: 100%;
  color: white;
  //z-index: 3;
`;

const TitleContent = styled.div`
 
  line-height: 48px;
  //text-align: center;
  
  h1 {
    font-size: 32px;
  }
`;

@observer
export default class HomePage extends React.Component<Props, {}> {

  @Inject uiStore: UiStore;
  @Inject userStore: UserStore;
  @Inject routerStore: RouterStore;

  onLogin = () => {
    if (this.userStore.loggedIn) {
      this.routerStore.jumpTo("/invreq");
    } else {
      this.uiStore.toggleLoginModalShown();
    }
  }

  render() {
    return <HomePageContainer>
      <BannerContainer>
        <BackgroundContainer>
          <img src={background}/>
        </BackgroundContainer>
        <Row style={{zIndex: 5}}>
          <Col xs={24} md={12}>
            <TitleShowcase>
              <TitleContent>
                <h1 style={{ color: "white" }}>Frontend Starter Kit</h1>
                <h2 style={{ color: "white" }}>Start coding with best technologies NOW!</h2>
              </TitleContent>
            </TitleShowcase>
          </Col>
        </Row>

      </BannerContainer>
    </HomePageContainer>;
  }
}
