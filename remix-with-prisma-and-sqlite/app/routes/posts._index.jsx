
import { useMatches } from "react-router";
import PostsList from "../components/PostsList";

export default function PostsLandingPage(){

  const matches = useMatches()
  // console.log(matches)
  const posts  = matches[1].data;

  return(
    <PostsList posts={posts}/>
  )
}