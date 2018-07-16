import createBrowserHistory from "history/createBrowserHistory";
import { Module } from "react.di";
import React from "react";
import initProviders from "../../providers";
import { AsyncRouteConfig, constructRoute, RouteType } from "../../router/RouteConfig";
import { Router, Switch } from "react-router";
import { BaseLayoutPage } from "./BaseLayoutPage";
import DevTools from "mobx-react-devtools";

function renderDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return (<DevTools/>);
  } else {
    return null;
  }
}

export interface AppProps {

}

export async function App() {
  const history = createBrowserHistory();
  const providers = await initProviders(history);
  return Module({
    providers: providers
  })(
  class App extends React.Component<AppProps, {}> {
    render() {
      return <div>
        <Router history={history}>
          <Switch>
            {constructRoute(homePage)}
            <BaseLayoutPage/>
            {constructRoute(notFoundPage)}
          </Switch>
        </Router>
        {/*{renderDevTool()}*/}
      </div>;
    }
  });
}
