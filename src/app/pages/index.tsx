import { Inject, Module } from "react.di";
import React from "react";
import providers from "../providers";
import { Router, Switch } from "react-router";
import DevTools from "mobx-react-devtools";
import { LocaleStore } from "../internationalization";
import { RouterStore } from "../routing/RouterStore";

function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return (<DevTools/>);
  } else {
    return null;
  }
}

interface State {
  loaded: boolean;
}


@Module({
  providers: providers
})
export class App extends React.Component<{}, State> {

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;

  state = {
    loaded: false
  };

  async componentDidMount() {
    await this.localeStore.init();
    this.setState({
      loaded: true
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return <div>
      <Router history={this.routerStore.history}>
        <Switch>
        </Switch>
      </Router>
      {renderDevTool()}
    </div>;
  }
}
