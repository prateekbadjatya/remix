import { Outlet} from "@remix-run/react";
import { getAllPosts } from "../db/query";

export const meta = () => {
  return [
    {title: "Posts page"},
    {name: "Description", content: "Welcome to all of our posts"}
  ]
}

export async function loader({params, request}){
  const posts = await getAllPosts()
  return posts
}

export default function Posts(){
    return (
      <>
        <Outlet/>
      </>
        
    )
}