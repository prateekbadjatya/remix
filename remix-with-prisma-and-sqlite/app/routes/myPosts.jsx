import { json, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { deletePostById, getPostsByUser } from "../db/query";
import { useEffect, useState } from "react";

export async function loader(){
  const userId = 1;
  const result = await getPostsByUser(userId)
  if(result.error){
    return []
  }else{
    return result.posts
  }
}

export async function action({request}){

  const body= await request.formData()
  const deleteId = body.get("deleteId")
  const result = await deletePostById(parseInt(deleteId))

  return json({error: result.error, errorMessage: result.errorMessage })
}

export default function MyPosts(){

  const posts = useLoaderData()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const handleEditPost = (id) => {
    navigate("/editPost/"+id)
  }

  const handleDeletePost = (id) => {
    fetcher.submit({deleteId: id}, {method: "POST"})
  }

  const [errorMsg, setErrorMsg] = useState()

  useEffect(()=>{
    if(fetcher.data?.error){
      setErrorMsg(fetcher.data.errorMessage)
    }
  },[fetcher.data])

  return(
    <>
    {posts && posts.length > 0 ? <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.length >0 && posts.map(post => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>
              <div role="group">
                <button onClick={()=> handleEditPost(post.id)}>Edit</button>
                <button onClick={()=> handleDeletePost(post.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table> : <><p>You do not have any posts</p></> }
    
    {errorMsg && <em>Error deleting post {errorMsg}</em>}
    </>
  )
}