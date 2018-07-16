import { observer } from "mobx-react";
import React from "react"
import { LocaleStore, Replacement } from "../../stores/LocaleStore";
import { Inject } from "react.di";


interface LocaleMessageProps {
  id: string;
  replacements?: { [s: string]: Replacement }

}

interface State {
  hasError: boolean;
}


@observer
export class LocaleMessage extends React.Component<LocaleMessageProps, State> {

  @Inject localeStore: LocaleStore;


  render() {
    try {
      return this.localeStore.get(this.props.id, this.props.replacements);
    } catch (e) {
      console.log(e);
      return this.props.id;
    }
  }

}
