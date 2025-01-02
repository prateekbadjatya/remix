import { json } from "@remix-run/node"
import { getAllPosts, getCommentsByPostSlug } from "../db/query"

export async function loader(){

    const result = await getCommentsByPostSlug("post-1")
    console.log(result)

    return json({success:true})
}

export default function Demo(){

    return(
        <>
            <h1>Demo page</h1>
            
        </>
    )
}