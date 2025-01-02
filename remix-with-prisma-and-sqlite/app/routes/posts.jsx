import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { getAllPosts } from "../db/query";
// import posts from "../../data.json"

export const meta = () => {
  return [
    {title: "Posts page"},
    {name: "Description", content: "Welcome to all of our posts"}
  ]
}

export async function loader(){

  const posts = await getAllPosts()

  return posts
}


export default function Posts(){

    // const posts = useLoaderData()
    //console.log("posts ",posts)

    return (
      <>
        
        <Outlet/>
      </>
        
    )
}