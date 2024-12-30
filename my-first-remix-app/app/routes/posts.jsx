import React from "react";

import { Outlet } from "@remix-run/react";
// http://localhost:5173/posts
const Posts = () => {
  return (
    <>
      <div>Posts</div>
      <Outlet />
    </>
  );
};

export default Posts;


// 

// So outlet component acts as a placeholder where the content of the child routes will be rendered in this post.

// Dot design design is the child route.

// You can see here.

// This gets rendered at this place now when I visit this class figma, I do not see this text.

// The reason?

// Because if if you consider this route Figma has a parent design, then design has a parent pose.

// We have the outlet component in posts, but we do not have any outlet component inside design.

// That is the reason the further child below this design are not being shown.

// So to do enable this.

// So I can do this like this.

// Okay I can then include this outlet component.

