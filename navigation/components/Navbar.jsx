import React from "react";
import { Link } from "@remix-run/react";

const Navbar = () => {
  return (
    <>
      <p>
        <Link to="/">Go to Home Page</Link>
      </p>
      <p>
        <Link to="/about">
          Go to About Page
        </Link>
      </p>
      <p>
        <Link
          // it will fetch tha content of posts on hover to see this open inspect
          prefetch="intent"
          to={{
            pathname: "/posts",
            search: "?name=Prateek",
            hash: "#hash",
          }}
        >
          Go to Posts Page
        </Link>
      </p>
      <p>
        {/* full page refresh */}
        {/* here reload document will loss the state becuase of page refresh */}
        <Link state={{ some: "value" }}  to="/demo" reloadDocument>
          Go to demo Page
        </Link>
      </p>
    </>
  );
};

export default Navbar;
