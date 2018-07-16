import React, { ReactNode } from "react"
import { observer } from "mobx-react";
import { LocaleStore, ReplacementMap } from "../../stores/LocaleStore";
import { Inject } from "react.di";

interface LocalizeProps {

  children: (props: any) => ReactNode;
  replacements?: ReplacementMap;
}

@observer
export class Localize<T> extends React.Component<LocalizeProps, {}> {

  @Inject localeStore: LocaleStore;

  render() {
    const childProducer = this.props.children;
    const properties = Object.keys(this.props.replacements)
      .reduce((obj, key) => ({ ...obj, [key]: this.localeStore.get(this.props.replacements[key] as string) }), {});
    return childProducer(properties);
  }
}
