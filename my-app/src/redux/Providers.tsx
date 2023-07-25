"use client";
import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./store";
interface props {
  children: React.ReactNode;
}
const Providers: FC<props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
