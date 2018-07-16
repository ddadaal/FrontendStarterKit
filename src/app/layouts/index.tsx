import React from "react";
import Layout from "antd/es/layout";

export function RootLayout(props: {children: React.ReactNode}) {
  return props.children;
}

export function useLayout(props: { layout: React.ComponentClass }) {
  return function(WrappedComponent): any {
    return class extends React.Component {
      render() {
        return React.createElement(props.layout, null, <WrappedComponent/>);
      }
    }
  }
}