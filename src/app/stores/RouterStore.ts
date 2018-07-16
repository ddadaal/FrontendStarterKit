import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, computed } from "mobx";
import { Injectable } from "react.di";
import querystring from 'querystring';

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
}
