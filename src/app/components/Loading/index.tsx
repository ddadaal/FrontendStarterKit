import React from "react";
import { Spin } from "antd";
import { LocaleMessage } from "../../internationalization/components";

interface Props {
  size?: "small" | "default" | "large";
}

export default class Loading extends React.Component<Props, {}> {
  render() {
    return <div>
      <Spin size={this.props.size}/><LocaleMessage id={"common.loading"}/>
    </div>;
  }
}
