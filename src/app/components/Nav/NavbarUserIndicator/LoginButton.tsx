import React from "react";
import { Button } from 'antd';
import { observer } from "mobx-react";
import { UiStore } from "../../../stores/UiStore";
import { Localize } from "../../../internationalization/components";
import { Inject } from "react.di";

interface Props  {

}

@observer
export class LoginButton extends React.Component<Props, {}>{

  @Inject uiStore: UiStore;

  onButtonClick = () => {
    this.uiStore.toggleLoginModalShown();
  };

  render() {
      return <Localize replacements={{ text: "navbar.login"}}>
          {props => <Button onClick={this.onButtonClick}>
              {props.text}
          </Button>
          }
        </Localize>

    }
}
