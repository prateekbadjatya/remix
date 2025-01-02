import { useLoaderData, useMatches, json, useActionData, useNavigation } from "@remix-run/react";
import Post from "../components/Post";
import Comments from "../components/Comments";
// import commentsData from "../../commentsData.json"
import fs from "fs"
import { useEffect, useState } from "react";
import { fakeDelay, formatDate } from "../utils/helper";
import { createComment } from "../db/query";

export async function loader({params}){
  console.log("loader function called")
  const slug = params.slug;
  
  // const currentPostComments = commentsData.filter( item => item.postSlug == slug)
  
  return json({slug: slug})
}

export async function action({request}){
  await fakeDelay(3000)
  const body = await request.formData();
  const commentBody = body.get('commentBody')
  const postId = body.get('postId')
  const postSlug = body.get('postSlug')
  
  const errors = {};

  if (!commentBody || commentBody == null || commentBody == "") {
      errors.commentBody = "Comment should not be empty";
  }
  if (Object.keys(errors).length > 0) {
      return json({ errors });
  }

  
  try {

     const result = await createComment(1,parseInt(postId),postSlug,commentBody )
      if(result.error){
        errors.commentBody = result.errorMessage
        return json({ errors })
      }else{
        return json({success:true})
      }
      return json({success:true})
  } catch (error) {
      console.log('error',error)
      return json({success:false})
  }

  
}


export default function SinglePost(){
  const {slug} = useLoaderData()
  const matches = useMatches()
  const posts = matches[1].data;
  const post = posts.find(item => item.slug === slug)
  // console.log("post", post)

  const postComments = post.comments;

  const actionData = useActionData()
  const navigation = useNavigation()
  const [comments, setComments] = useState(postComments)

  useEffect(()=>{

    if(navigation.formData && navigation.formData.get("commentBody")){
      const newComment = {
        "id":Date.now(),
        "userId":1,
        "postId": parseInt(navigation.formData.get("postId")),
        "postSlug": navigation.formData.get("postSlug"),
        "body": navigation.formData.get("commentBody"),
        "createdAt":formatDate()
      }

      const updatedData = [...comments, newComment];
      setComments(updatedData)
    }

  },[navigation.formData])


  useEffect(()=>{
    if(actionData && !actionData?.success){
      setComments(postComments)
    }
  },[actionData])
  

  return (
    <>
    <Post post={post}/>
    <Comments comments={comments} actionData={actionData} postId={post.id} postSlug={slug}/>
    </>
   
  )
}
