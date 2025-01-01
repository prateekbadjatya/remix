import { Link, NavLink, useLoaderData, useNavigate } from "@remix-run/react";
// import posts from "../../data.json";
import PostsList from "../components/PostsList";
import posts from "../../data.json";

import { Outlet } from "@remix-run/react";
export const meta = () => {
  return [
    { title: "Posts page" },
    { name: "Description", content: "Welcome to all of our posts" },
  ];
};

export async function loader() {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("loader called");
  console.log(
    "----------------------------------------------------------------"
  );

  return posts;
}

export default function Posts() {
  return (
    <>
      {/* <PostsList posts={posts} /> */}
      {/* ----------------------------------------------------------- */}
      {/* this out let will render the parent routes */}
      {/* But from posts_index we dont decleare any out let it will no go to the there child
       */}
      <Outlet />
    </>
  );
}
