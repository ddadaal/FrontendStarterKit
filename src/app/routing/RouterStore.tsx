import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, computed } from "mobx";
import { Injectable } from "react.di";
import querystring from 'querystring';
import { KnownRouteConfig, RouteType } from "./RouteConfig";
import { AsyncRoute } from "./AsyncRoute";
import { Redirect } from "react-router";
import * as React from "react";

@Injectable
export class RouterStore extends BaseRouterStore {
  constructor(history?: History) {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @computed get query() {
    return querystring.parse(this.location.search.substr(1));
  }

  @computed get path() {
    return this.location.pathname;
  }


  @action jumpTo = (path: string) => {
    this.push(path);
  };

  constructRoute(config: KnownRouteConfig) {
    const exact = config.exact === false;

    switch (config.type) {
      case RouteType.Async:
        return <AsyncRoute exact={exact}
                           key={config.path}
                           path={config.path}
                           component={config.component}
        />;
      case
      RouteType.Redirect:
        return <Redirect exact={exact}
                         key={config.path}
                         from={config.path}
                         path={config.path}
                         to={config.to}
        />

    }
  }
}
