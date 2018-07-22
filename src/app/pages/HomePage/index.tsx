import React from 'react';
import { RootLayout } from "../../layouts/RootLayout";
import { LocaleMessage } from "../../internationalization/components";
import { lang } from '../../internationalization';

interface Props {

}

export default class HomePage extends React.Component<Props, {}> {
  render() {
    return <LocaleMessage id={lang().common.loading}/>
  }
}
