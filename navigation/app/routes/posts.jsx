import React from "react";
import { Link, NavLink } from "@remix-run/react";

// If true, replaces the current history entry instead of pushing a new one. This is useful for state updates.

// To see this click on back arrow button of browser this  history will be replace

const PostsPage = () => {
  return (
    <>
      <p>
        <Link replace to="/about">
          Go to About Page
        </Link>
        <br />
        {/* whenever there is a match it will add the class active automatically , it provide style props also*/}
        <NavLink
          style={(isActive, isPending) => {
            return {
              color: isActive ? "blue" : "red",
              fontWeight: isPending ? "bold" : "",
            };
          }}
          to="/posts"
        >
          Posts
        </NavLink>
        <br />
        <NavLink to="/about">About</NavLink>
      </p>
    </>
  );
};

export default PostsPage;
