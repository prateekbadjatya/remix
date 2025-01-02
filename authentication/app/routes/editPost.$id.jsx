import { Form, redirect, useActionData, useLoaderData, useNavigation, json } from "@remix-run/react"
import Spinner from "../components/helper/Spinner"
import { getPostById, updatePost } from "../db/query";
import { useState } from "react";
import { countWords } from "../utils/helper";

export async function loader({params}){

  const postId = params.id;
  const result = await getPostById(parseInt(postId));
  // console.log(result);
  if(result.error){
    return {}
  }else{
    return result.post
  }
}

export async function action({request}){

  const body = await request.formData();
  const postId = body.get('postId')
  const slug = body.get('slug')
  const title = body.get('title')
  const content = body.get('content')

  const errors = {};

  
  if(!title || title == null || title == "" || countWords(title) < 2){
    errors.title = "Invalid title"
  }
  if(!content || content == null || content == "" || countWords(content) < 20){
    errors.content = "Invalid content"
  }

  if(Object.keys(errors).length >0){
    return json({errors});
  }
  

  try {

    const result = await updatePost(parseInt(postId),title,content)
    
  } catch (error) {
    console.log("unexpected error:",error)
  }
  
  return redirect("/posts")
}

export default function EditPost(){
  const post = useLoaderData()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const actionData= useActionData()
  const naviagtion = useNavigation()
  return(
    <div>
      <Form method="POST">
        <input type="hidden" name="postId" value={post.id}/>
        
  
        <section>
            <label htmlFor="title">Title:</label>
            {actionData?.errors?.title ? (<em style={{color:"red"}}>{actionData?.errors?.title}</em>) : null}
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.value)} required/>
        </section>
        <section>
            <label htmlFor="content">Content:</label>
            {actionData?.errors?.content ? (<em style={{color:"red"}}>{actionData?.errors?.content}</em>) : null}
            <input type="text" name="content" value={content} onChange={(e) => setContent(e.value)}/>
        </section>
        <section>
            <button type="submit" style={{display: naviagtion.state === "submitting" ? "none" : "block"}}>Edit Post</button>
            {naviagtion.state === "submitting" && <Spinner/>}
        </section>
      </Form>
    </div>
  )
}