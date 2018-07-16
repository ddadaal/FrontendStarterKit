import { observer } from "mobx-react";
import React from "react"
import { LocaleMessage } from "../../internationalization";
import { action, observable, runInAction } from "mobx";
import { Dropdown, Icon, Menu } from 'antd';
import { Inject } from "react.di";
import { LocaleStore } from "../../stores/LocaleStore";

interface LanguageSelectorProps {

}

interface LanguageSelectorItemProps {

}


@observer
export class LanguageSelector extends React.Component<LanguageSelectorProps, any> {
  @observable switchingToId: string = "";

  @Inject localeStore: LocaleStore;

  constructMenu() {
    const items = this.constructChildren();
    return <Menu>
      {items}
    </Menu>;
  }
  languageOnClickProducer = (id: string) => action(async () => {
    this.switchingToId = id;
    await this.localeStore.changeLanguage(id);
    runInAction(() => {
      this.switchingToId = "";
    });

  });

  constructChildren() {
    return this.localeStore.allLanguages.filter(x => x.id !== this.localeStore.currentLanguage.id).map(x =>
      <Menu.Item key={x.id}>
        <a onClick={this.languageOnClickProducer(x.id)}>
          {x.name}
          {this.switchingToId == x.id ? <LocaleMessage id={"languageSelector.loading"}/> : null}
        </a>

      </Menu.Item>
    );
  }

  render() {
    return <Dropdown overlay={this.constructMenu()}>
      <a className="ant-dropdown-link">
        {this.localeStore.currentLanguage.name} <Icon type="down" />
      </a>
    </Dropdown>
;
  }
}
