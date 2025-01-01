import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function Comments({ comments, actionData }) {
  const commentRef = useRef();
  useEffect(() => {
    if (actionData && actionData?.success) {
      // after success make the value to empty string
      commentRef.current.value = "";
    }
  }, [actionData]);

  return (
    <section className="comment-section">
      <h2>Comments ({comments.length})</h2>

      <Form method="post">
        <textarea
          name="commentBody"
          ref={commentRef}
          rows="4"
          placeholder="Write a comment..."
        ></textarea>
        {actionData?.errors?.commentBody ? (
          <em style={{ color: "red" }}>
            {actionData?.errors.commentBody}
            <br />
          </em>
        ) : null}
        <input type="hidden" name="postSlug" value={comments[0].postSlug} />
        <input type="hidden" name="postId" value={comments[0].postId} />
        <button type="submit">Post</button>
      </Form>

      <article>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.body}</p>
            <time dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        ))}
      </article>
    </section>
  );
}
