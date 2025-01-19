import React from "react";
import { Sort } from "./sort";
import { ToastContainer } from "react-toastify";

export const Routes = () => {
  return (
    <>
      <Sort />
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};
