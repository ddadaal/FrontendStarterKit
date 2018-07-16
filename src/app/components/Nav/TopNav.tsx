import React from 'react';
import { Inject } from "react.di";
import { Icon, Menu } from 'antd';
import { RouterStore } from "../../stores/RouterStore";
import { NavItemProps } from "../../stores/NavStore";
import { Link } from 'react-router-dom';
import { dropdownMenuStyle, horizontalMenuStyle } from "./Layout";
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  dropdownMode: boolean;
  routes: NavItemProps[];
}

export class TopNav extends React.PureComponent<Props> {

  @Inject routerStore: RouterStore;

  get selectedRoute() {
    return this.props.routes.filter(x => x.match(this.routerStore.path)).map(x => x.path)
  }

  render() {
    const {routes} = this.props;
    return <Menu
      theme="light"
      mode={this.props.dropdownMode ? "inline" : "horizontal"}
      selectedKeys={this.selectedRoute}
      style={this.props.dropdownMode ? dropdownMenuStyle : horizontalMenuStyle}
    >
      {routes.map(x => (
        <Menu.Item key={x.path}>
          <Link to={x.path}>
           <span>
              <Icon type={x.iconName}/>
              <LocaleMessage id={x.id}/>
           </span>
          </Link>
        </Menu.Item>

      ))}
    </Menu>
  }
}
