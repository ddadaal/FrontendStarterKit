import React from "react";
import { Icon, Menu, Layout } from 'antd';
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Inject } from "react.di";
import { LogoContainer } from "../Layout";
import { RouterStore } from "../../../stores/RouterStore";
import { NavItemProps, NavStore } from "../../../stores/NavStore";
import { navRoutes, NOT_LOGIN_FLAG, submenuMap } from "./SubMenus";
import { LocaleMessage } from "../../../internationalization/components";
import { UserStore } from "../../../stores/UserStore";
import { action, computed } from "mobx";
import { SvgImg } from "../../Common/SvgImg";
import styled from "styled-components";
import { flatten } from "../../../../utils/Array";
import { SiderProps } from "antd/es/layout";
import { LogoItem } from "../LogoItem";

const {SubMenu} = Menu;
const {Sider} = Layout;

// import pages will result in circular dependency and I can't figure out why
// hard-code is the only option :(


interface MySiderProps {
  shown: boolean;
}

const MySider = styled(Sider) `
    display: ${(props: MySiderProps) => props.shown ? "initial" : "none"};
    position: absolute;
    z-index: 5;
    height: 100%;
    
    @media (min-width: 700px) {
      position: relative;
      height: initial;
    }
    
    .ant-layout-sider-trigger {
      bottom: initial !important;
    }
`;


@observer
export class MainNav extends React.Component<{}, {}> {

  @Inject routerStore: RouterStore;
  @Inject navStore: NavStore;
  @Inject userStore: UserStore;

  @computed get currentSubMenuMap() {
    return submenuMap[this.userStore.loggedIn ? this.userStore.user.role : NOT_LOGIN_FLAG];
  }

  get selectedRoute() {
    const selected = Object.keys(navRoutes)
      .map(x => navRoutes[x])
      .filter(x => x.match(this.routerStore.path))
      .map(x => x.path);

    const selectedSubMenus = Object.keys(this.currentSubMenuMap).map(x => this.currentSubMenuMap[x])
      .map(x => x.filter(y => y.match(this.routerStore.path)).map(x => x.path));

    return [...selected, ...flatten(selectedSubMenus)];
  }

  jumpTo = (path: string) => {
    this.routerStore.jumpTo(path);
  };

  @action onCollapse = () => {
    this.navStore.navMenuShown = false;
  };

  render() {
    return <MySider collapsed={false}
                  shown={this.navStore.navMenuShown}>
      <LogoItem/>
      <Menu
        theme="dark"
        mode={"inline"}
        selectedKeys={this.selectedRoute}
      >
        {Object.keys(navRoutes)
          .map(x => {
              const root = navRoutes[x];
              const subs: NavItemProps[] = this.currentSubMenuMap[x];
              if (!subs || subs.length == 0) {
                return <Menu.Item key={root.path}>
                  <Icon type={root.iconName}/>
                  <span onClick={() => this.jumpTo(root.path)}>
            <LocaleMessage id={root.id}/>
          </span>
                </Menu.Item>
              } else {
                return <SubMenu key={root.path} title={
                  <span>
                  <Icon type={root.iconName}/>
                  <span><LocaleMessage id={root.id}/></span>
                </span>}>
                  {subs.map(sub =>
                    <Menu.Item key={sub.path}>
                      <Icon type={sub.iconName}/>
                      <span onClick={() => this.jumpTo(sub.path)}>
                      <LocaleMessage id={sub.id}/>
                      </span>
                    </Menu.Item>
                  )}
                </SubMenu>;
              }

            }
          )}
        <Menu.Item key={"back"} onClick={this.onCollapse}>
          <Icon type={"left"}/>
          <span>
                      <LocaleMessage id={"navbar.collapse"}/>
          </span>
        </Menu.Item>
      </Menu>
    </MySider>
  }
}
