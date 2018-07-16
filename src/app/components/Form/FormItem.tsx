import React, { ReactNode } from 'react';
import { FormItemProps } from "antd/lib/form/FormItem";
import { Form } from 'antd';

const AntdFormItem = Form.Item;

interface Props {
  valid: boolean;
  messageOnInvalid: ReactNode;
  messageOnSuccess?: ReactNode;
}

function formItemProps(valid: boolean, error: ReactNode, messageOnSuccess: ReactNode): FormItemProps  {
  return {
    validateStatus: valid ? "success" : "error",
    help: valid? messageOnSuccess : error
  };
}

export class FormItem extends React.Component<Props, {}> {
  render() {
    return <AntdFormItem {...formItemProps(this.props.valid, this.props.messageOnInvalid, this.props.messageOnSuccess)}>
      {this.props.children}
    </AntdFormItem>
  }
}
