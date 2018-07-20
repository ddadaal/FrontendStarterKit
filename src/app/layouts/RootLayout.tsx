import React from "react";
import { MainNav } from "../components/Nav/MainNav";


export function RootLayout(props: {children: React.ReactNode}) {
  console.log("refreshed");
  return <div>
    <MainNav/>
    {props.children}
  </div>
}
