import React from "react";

import { Outlet } from "@remix-run/react";


const Auth = () => {
  return (
    <>
      <h1>Auth</h1>
      <Outlet />
    </>
  );
};

export default Auth;
