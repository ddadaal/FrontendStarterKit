import React from "react";
import { Button, Modal, message } from 'antd';
import { Localize } from "../../../internationalization/components";
import { observer } from "mobx-react";
import { UiStore } from "../../../stores/UiStore";
import { LoginController, LoginError, LoginErrorType, LoginServerError } from "./LoginController";
import { LoginForm } from "./Form";
import { action } from "mobx";
import { Inject, Module } from "react.di";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { LocaleStore } from "../../../stores/LocaleStore";
import Hotkeys from 'react-hot-keys';

interface Props  {

}

const RegisterButton = styled(Button)`
  float: left;
` as any;


const ID_PREFIX = "loginModal.";

@Module({
  providers: [
    LoginController
  ]
})
@observer
export class LoginModal extends React.Component<Props, any> {

  @Inject controller: LoginController;

  @Inject uiStore: UiStore;

  @Inject localeStore: LocaleStore;

  onCancel = () => {
    this.uiStore.toggleLoginModalShown();
  };


  @action onOk = async () => {
    const {fields} = this.controller;
    fields.loginAttempted = true;
    if (fields.valid) {
      try {
        await this.controller.doLogin();
        this.uiStore.toggleLoginModalShown();
      } catch (e) {
        const typedException = e as LoginError;
        message.error(this.localeStore.get(`${ID_PREFIX}error.${typedException.type}`));
        switch (typedException.type) {
          case LoginErrorType.ServerError:
            message.error((typedException as LoginServerError).messages);
        }
        console.log(e);
      }
    }
  };

  onBtnRegisterClick = () => {
    this.uiStore.toggleLoginModalShown();
  };

  render() {
    const props = {
      title: "title",
      login: "login",
      cancel: "cancel",
      register: "register"
    };

    Object.keys(props).forEach(x => props[x] = ID_PREFIX+props[x]);

    return <Localize replacements={props}>
        {props =>
          <Hotkeys
          keyName={"enter"}
          onKeyDown={this.onOk}
          >
            <Modal visible={this.uiStore.loginModalShown}
                 title={props.title}
                 onCancel={this.onCancel}
                 onOk={this.onOk}
                 footer={[
                   <Link key={"register"} to={"/register"}>
                     <RegisterButton onClick={this.onBtnRegisterClick}>
                       <span>{props.register}</span>
                     </RegisterButton>
                   </Link>,
                   <Button key="back" onClick={this.onCancel}>
                     <span>{props.cancel}</span>
                   </Button>,
                   <Button key="submit" type="primary" loading={this.controller.loggingIn} onClick={this.onOk}>
                     <span>{props.login}</span>
                   </Button>
                 ]}
          >
            <LoginForm fields={this.controller.fields}/>
          </Modal>
          </Hotkeys>
        }
      </Localize>;
  }
}
