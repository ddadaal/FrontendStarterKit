import React, { ReactNode } from 'react';
import { Route, RouteComponentProps } from "react-router";
import { ObserverAsyncComponent } from "./AsyncComponent";

interface Props<T> {
  path: string;
  exact?: boolean;
  component?: Promise<any>;
  render?: (props: RouteComponentProps<T>) => Promise<ReactNode>;
}

export class AsyncRoute<T> extends React.PureComponent<Props<T>> {


  renderRoute = (props) => {
    return <ObserverAsyncComponent
      render={this.props.component
        ? async () => {
          return React.createElement((await this.props.component).default, props)
        }
        : this.props.render}
      props={props}
    />;
  };

  render() {
    return <Route path={this.props.path} exact={this.props.exact}
                  render={this.renderRoute}/>;
  }
}
