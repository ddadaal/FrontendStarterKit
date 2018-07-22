import { Inject, Module } from "react.di";
import React from "react";
import providers from "../providers";
import { Router, Switch } from "react-router";
import DevTools from "mobx-react-devtools";
import { LocaleStore } from "../internationalization";
import { RouterStore } from "../routing/RouterStore";
import { AsyncRouteConfig, RouteConfig, RouteType, KnownRouteConfig } from "../routing/RouteConfig";
import { RootLayout } from "../layouts/RootLayout";

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

const rootRoutes: KnownRouteConfig[] = [
  { type: RouteType.Async, path:"/", component: import("./HomePage") },
  { type: RouteType.Async, path:"/about", component: import("./AboutPage") },
];

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
    // initialize global states here
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
      <RootLayout>
      <Router history={this.routerStore.history}>
        <Switch>
          {rootRoutes.map(this.routerStore.constructRoute)}
        </Switch>
      </Router>
      </RootLayout>
      {/*{renderDevTool()}*/}
    </div>;
  }
}
