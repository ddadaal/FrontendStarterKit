import React from "react";

export function RootLayout(props: {children: React.ReactNode}) {
  return <div>
    {props.children}
  </div>;
}
