import { Checkbox, Form, Icon, Input } from 'antd';
import React from 'react';
import { Localize } from "../../internationalization/components";
import { observer } from "mobx-react";
import { LoginFormFields } from "./LoginController";
import { action } from "mobx";
import { FormItem } from "../Form/FormItem";

interface Props  {
  fields: LoginFormFields;
}
@observer
export class LoginForm extends React.Component<Props, {}> {


  @action onUsernameChange = (e) => {
    this.props.fields.username = e.target.value;
  };

  @action onPasswordChange = (e) => {
    this.props.fields.password = e.target.value;
  };

  @action onRememberChange = (e) => {
    this.props.fields.remember = e.target.checked;
  };


  render() {
    const {fields} = this.props;
    const props = {
      username: "loginModal.username",
      password: "loginModal.password",
      requireUsername: "loginModal.requireUsername",
      requirePassword: "loginModal.requirePassword",
      remember: "loginModal.remember",
      forgetPassword: "loginModal.forgetPassword"
    };
    return (
      <Localize replacements={props}>
        {
          props => <Form className="login-form">
            <FormItem valid={fields.usernameValid} messageOnInvalid={props.requireUsername}>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     onChange={this.onUsernameChange}
                     placeholder={props.username}
                     value={fields.username}
              />
            </FormItem>
            <FormItem valid={fields.passwordValid} messageOnInvalid={props.requirePassword}>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     type="password"
                     onChange={this.onPasswordChange}
                     placeholder={props.password}
                     value={fields.password}
              />
            </FormItem>
            <FormItem valid={true} messageOnInvalid={null}>
              <Checkbox onChange={this.onRememberChange}
                        checked={fields.remember}
              >
                {props.remember}
                </Checkbox>
            </FormItem>
          </Form>
        }
      </Localize>
    );
  }
}
