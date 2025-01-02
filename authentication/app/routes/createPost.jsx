import { useActionData,json, Form, useNavigation, redirect } from "@remix-run/react";
import data from "../../data.json";
import fs from 'fs';
import { fakeDelay, countWords, formatDate } from "../utils/helper";
import Spinner from "../components/helper/Spinner";
import { createPost } from "../db/query";
import { getSession } from "../sessions-db";

export async function loader({params, request}){

  const session = await getSession(request.headers.get('Cookie'))
  if(!session.has("userId")){
    return redirect("/")
  }

  return json({success:true})
}
export async function action({request}){
  
  await fakeDelay(3000)

  const body = await request.formData();
  const userId = body.get('userId')
  const slug = body.get('slug')
  const title = body.get('title')
  const content = body.get('content')

  const errors = {};

  if(!userId || userId == null || userId == ""){
    errors.userId = "Invalid user id"
  }
  if(!slug || slug == null || slug == ""){
    errors.slug = "Invalid slug"
  }
  console.log("words",countWords(title))
  if(!title || title == null || title == "" || countWords(title) < 2){
    errors.title = "Invalid title"
  }
  console.log("words",countWords(content))
  if(!content || content == null || content == "" || countWords(content) < 20){
    errors.content = "Invalid content"
  }

  if(Object.keys(errors).length >0){
    return json({errors});
  }
  

  try {

    const result = await createPost(parseInt(userId),slug,title,content)
    
  } catch (error) {
    console.log("unexpected error:",error)
  }
  
  return redirect("/posts")
}

export default function CreatePost(){  
  const actionData = useActionData();

  const naviagtion = useNavigation()
  
  return(
    <div>
      <Form method="POST">
        <section>
            <label htmlFor="userId">User ID:</label>
            {actionData?.errors?.userId ? (<em style={{color:"red"}}>{actionData?.errors?.userId}</em>) : null}
            <input type="number" name="userId"/>
        </section>
        <section>
            <label htmlFor="slug">Slug:</label>
            {actionData?.errors?.slug ? (<em style={{color:"red"}}>{actionData?.errors?.slug}</em>) : null}
            <input type="text" name="slug"/>
        </section>
        <section>
            <label htmlFor="title">Title:</label>
            {actionData?.errors?.title ? (<em style={{color:"red"}}>{actionData?.errors?.title}</em>) : null}
            <input type="text" name="title" required/>
        </section>
        <section>
            <label htmlFor="content">Content:</label>
            {actionData?.errors?.content ? (<em style={{color:"red"}}>{actionData?.errors?.content}</em>) : null}
            <input type="text" name="content"/>
        </section>
        <section>
            <button type="submit" style={{display: naviagtion.state === "submitting" ? "none" : "block"}}>Create Post</button>
            {naviagtion.state === "submitting" && <Spinner/>}
        </section>
      </Form>
    </div>
  )
}
