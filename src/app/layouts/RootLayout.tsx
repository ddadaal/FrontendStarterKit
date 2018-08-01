import React from "react";
import { LanguageSelector } from "../components/LanguageSelector";

export function RootLayout(props: {children: React.ReactNode}) {
  return <div>
    {props.children}
  </div>
}
