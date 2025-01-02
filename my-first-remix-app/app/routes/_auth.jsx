import React from "react";

import { Outlet } from "@remix-run/react";

//The _auth.jsx file in your structure is a pathless route. It serves as a parent layout or wrapper for its child routes (_auth.login.jsx and _auth.register.jsx). Since _auth itself does not define a path, it is inaccessible at /auth.

const Auth = () => {
  return (
    <>
      <h1>Auth</h1>
      <Outlet />
    </>
  );
};

export default Auth;
