import React from 'react';
import { Icon, Menu } from 'antd';
import { Inject } from "react.di";
import { RouterStore } from "../../routing/RouterStore";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { LocaleMessage } from "../../internationalization/components";
import { NavItemProps } from "./NavItemProps";


interface Props {
  routes: NavItemProps[];
}

@observer
export class SubNavMenu extends React.Component<Props, {}> {

  @Inject routerStore: RouterStore;
  @Inject userStore: UserStore;

  get selectedRoutes() {
    return this.props.routes
      .filter(x => x.match(this.routerStore.path))
      .map(x => x.path);
  }

  render() {
    return <Menu
      mode="inline"
      selectedKeys={this.selectedRoutes}
      style={{ height: '100%' }}
    >
      {this.props.routes.map(x => <Menu.Item key={x.path}>
        <Link to={x.path}>
          <span>{ x.iconName ? <Icon type={x.iconName} /> : null}<LocaleMessage id={x.id}/></span>
        </Link>
      </Menu.Item>)}
    </Menu>
  }
}
