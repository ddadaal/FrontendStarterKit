import React from 'react';
import { RootLayout } from "../../layouts/RootLayout";
import { LocaleMessage } from "../../internationalization/components";
import { lang } from '../../internationalization';
import { LanguageSelector } from "../../components/LanguageSelector";

interface Props {

}

export default class HomePage extends React.Component<Props, {}> {
  render() {
    return <div>
      <LanguageSelector/>
      <LocaleMessage id={lang().common.loading}/>
    </div>
  }
}
