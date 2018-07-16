import React, { ReactNode } from "react"
import { observer } from "mobx-react";


interface AsyncComponentProps<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  componentWhenLoading?: ReactNode;
  componentProducerWhenLoadingFailed?: (e) => ReactNode;
  onRenderSuccess?(): void;
}

interface State<T> {
  render: (props: T) => Promise<ReactNode>;
  props?: T;
  component: ReactNode;
  loaded: boolean;
}

export class AsyncComponent<T> extends React.Component<AsyncComponentProps<T>, State<T>> {

  state = {
    render: this.props.render,
    props: this.props.props,
    component: this.props.componentWhenLoading || null,
    loaded: false
  };

  async loadComponent() {
    try {
      const component = await this.props.render(this.props.props);
      this.props.onRenderSuccess && this.props.onRenderSuccess();
      this.setState({
        component: component,
        loaded: true
      });
    } catch (e) {
      console.log(e);
      if (this.props.componentProducerWhenLoadingFailed) {
        this.setState({
            component: this.props.componentProducerWhenLoadingFailed(e),
            loaded: true
          }
        );
      }
    }
  }


  componentDidMount() {
    this.loadComponent();
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      this.loadComponent();
    }

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.props !== prevState.props) {
      console.log("render needed");
      return {render: nextProps.render, props: nextProps.props, loaded: false};
    } else {
      return null;
    }

  }

  render() {
    return this.state.component;
  }
}


// export const ObserverAsyncComponent = observer(AsyncComponent);

export function ObserverAsyncComponent<T> (props: AsyncComponentProps<T>) {
    return React.createElement(observer(() => <AsyncComponent {...props}/>));
}
