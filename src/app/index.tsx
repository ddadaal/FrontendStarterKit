import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from "mobx";
import { App } from "./pages/root";

import '../assets/less/antMotion_style.less';
// enable MobX strict mode
configure({enforceActions: true});

async function render() {
  // render react DOM
  const AppComponent = await App();
  ReactDOM.render(
    <AppComponent/>,
    document.getElementById('root')
  );
  if (module.hot) {
    module.hot.accept();
  }
}


render();


