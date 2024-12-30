import React from "react";
import { Outlet } from "@remix-run/react";

const Design = () => {
  return (
    <>
      <h1>Design</h1>

      <Outlet />
    </>
  );
};

export default Design;
