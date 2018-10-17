import { UserStore } from "../../../stores/UserStore";
import React from "react";
import { Avatar, Dropdown, Icon, Menu } from "antd";
import { observer } from "mobx-react";
import { LocaleMessage } from "../../../internationalization/components/index";
import { Link } from "react-router-dom";
import { Inject } from "react.di";
import lang from "../../../internationalization/LocaleStore/lang";
import MediaQuery from "react-responsive";
import { layoutConstants } from "../../components/constants";

interface Props {

}

const root = lang().nav;

@observer
export class UserIndicator extends React.Component<Props, {}> {

  @Inject userStore: UserStore;

  logout = () => {
    this.userStore.logout();
  }

  render() {
    const dropdownMenu = <Menu>
      <Menu.Item key="self">
        <Link to={"/user"}><LocaleMessage id={root.selfCenter}/></Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="logout">
        <a onClick={this.logout}><LocaleMessage id={root.logout}/></a>
      </Menu.Item>
    </Menu>;

    return <Dropdown overlay={dropdownMenu} trigger={["click"]}>
      <a className="ant-dropdown-link">
        <Avatar size="default" src={this.userStore.user.avatarUrl}/>
        <MediaQuery minWidth={layoutConstants.menuBreakpoint}>
          <span style={{marginLeft: "8px"}}>
          <LocaleMessage id={root.welcome} replacements={{username: this.userStore.user.username}}/>
          <Icon type="down"/>
        </span>
        </MediaQuery>
      </a>
    </Dropdown>;
  }
}
