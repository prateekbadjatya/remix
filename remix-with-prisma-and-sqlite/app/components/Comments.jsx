import { Form } from "@remix-run/react";
import { useEffect, useRef } from 'react';

export default function Comments({comments, actionData, postId, postSlug}){ 

  const commentRef = useRef();
  useEffect(()=>{
      if(actionData && actionData.success){
          commentRef.current.value = '';
      }
  },[actionData])


  return(
    <section>
      <h2>Comments ({comments.length})</h2>
      <Form method="POST">
        {actionData?.errors?.commentBody ? (<em style={{color: "red"}}>{actionData?.errors?.commentBody}</em>) : null}
        <textarea ref={commentRef} name="commentBody" rows="4" placeholder="Write a comment here..."></textarea>
        <input type="hidden" name="postId" value={postId}/>
        <input type="hidden" name="postSlug" value={postSlug}/>
        <button type="submit">Post</button>
      </Form>
      <article>
        {comments.length > 0 && comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <time dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        ))}
      </article>
    </section>
  )
}