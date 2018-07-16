import React from "react";
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LocaleMessage } from "../../../internationalization/components";

export class NavMenuItem extends React.Component<{path: string, iconName: string, textId: string}> {
  render() {
    return <Menu.Item key={this.props.path}>
      <Link to={this.props.path}>
        <span><Icon type={this.props.iconName} /><LocaleMessage id={this.props.textId}/></span>
      </Link>
    </Menu.Item>
  }
}
