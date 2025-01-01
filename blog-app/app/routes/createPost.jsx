import React from "react";
import {
  useNavigation,
  Link,
  NavLink,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import posts from "../../data.json";

import fs from "fs";
//loader handle all the get request
// where as actions handle all the mutation request

import { Form, useActionData } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");

  //-----------------------------------------------------------
  //form validation using useActionData hook
  const errors = {};
  if (!userId || userId === undefined || userId === null || userId === "") {
    errors.userId = "Invalid userId";
  }

  if (!title || title === undefined || title === null || title === "") {
    errors.title = "Invalid title";
  }

  if (!slug || slug === undefined || slug === null || slug === "") {
    errors.slug = "Invalid slug";
  }

  if (!content || content === undefined || content === null || content === "") {
    errors.content = "Invalid content";
  }

  if (Object.keys(errors).length) {
    return json({ errors });
  }
  //-----------------------------------------------------------

  const author = "John Doe";
  const createdAt = new Date();
  const id = 6;

  const newPost = {
    id,
    userId: parseInt(userId),
    title,
    content,
    author,
    createdAt,
    slug,
  };

  const newData = [...posts, newPost];

  try {
    const filePath =
      "C:\\Users\\PRATEEK\\Downloads\\remix\\blog-app\\data.json";
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    return newPost;
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
  }
  console.log("action called");
  return json({ success: true, post: newPost });
  //   return redirect(`/posts`);
}

const CreatePost = () => {
  /*
     useActionData hook in Remix is used to retrieve data returned by the action function in a route module after a form submission. It allows you to display error messages, validation results, or any other response data sent back from the server in your UI.
      */
  const actionData = useActionData();
  console.log("🚀 ~ CreatePost ~ actionData:", actionData?.errors?.userId);

  //-------------------------------------------
  //Pending State
  const navigation = useNavigation();
  //-------------------------------------------

  return (
    <div>
      {/* If we dont define the action in form tag it submitted to the current route(/createPost) */}
      {/* <form method="POST"> */}
      <Form method="POST">
        <section>
          <label htmlFor="userId">User Id:</label>

          <input type="number" name="userId" />
          {/* showing error */}
          {actionData?.errors?.userId ? (
            <em style={{ color: "red" }}>{actionData?.errors?.userId}</em>
          ) : null}
        </section>
        <section>
          <label htmlFor="slug">Slug:</label>
          <input type="text" name="slug" />
        </section>
        <section>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" />
        </section>
        <section>
          <label htmlFor="content">Content:</label>
          <input type="text" name="content" />
        </section>

        <section
          style={{
            display: navigation.state === "submitting" ? "none" : "block",
          }}
        >
          <button type="submit">Create Post</button>
        </section>
        {/* {navigation.state === "submitting" ? <Spinner/> : null } */}
      </Form>
      {/* </form> */}
    </div>
  );
};

export default CreatePost;

// navigation states

{
  /* <div>
{navigation.state === "idle" && <p>No navigation in progress.</p>}
{navigation.state === "submitting" && (
  <p>Submitting form to: {navigation.formAction}</p>
)}
{navigation.state === "loading" && (
  <p>Loading new page: {navigation.location.pathname}</p>
)}
</div> */
}

// state: Indicates the navigation state, which can be one of the following:

// "idle": No navigation is happening.
// "submitting": A form is being submitted.
// "loading": A page or resource is being loaded.
