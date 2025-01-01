import React, { useState, useEffect } from "react";
import {
  useLoaderData,
  useMatches,
  json,
  useActionData,
  useNavigation,
} from "@remix-run/react";

// import posts from "../../data.json";
import PostsList from "../components/PostsList";
import Comments from "../components/Comments";
import commentsData from "../../commentsData.json";
import fs from "fs";
import { fakeDelay } from "../utils/helpers";



// export async function loader({ params }) {
//   const slug = params.slug;
//   // const data = posts.find((item) => item.slug === slug);
//   // return data ?? {};
//   return slug;
// }

export async function loader({ params }) {
  const slug = params.slug;

  const currentPostComments = commentsData.filter(
    (item) => item.postSlug == slug
  );
  return json({ slug: slug, postComments: currentPostComments });
}

//------------actions------------------------------------

/*
Here updated comment will be fetched because of loader component automatically

*/
export async function action({ request }) {
  await fakeDelay(5000);
  const body = await request.formData();
  const commentBody = body.get("commentBody");
  const postId = body.get("postId");
  const postSlug = body.get("postSlug");

  const errors = {};

  if (!commentBody || commentBody == null || commentBody == "") {
    errors.commentBody = "Comment should not be empty";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  const newComment = {
    id: Date.now(),
    userId: 1,
    postId: parseInt(postId),
    postSlug: postSlug,
    body: commentBody,
    createdAt: new Date(),
  };
  const newComments = [...commentsData, newComment];
  try {
    // Get the absolute path to the data.json file
    const commentsFilePath =
      "C:\\Users\\PRATEEK\\Downloads\\remix\\blog-app\\commentsData.json";
    // Write the updated data back to the file
    fs.writeFileSync(commentsFilePath, JSON.stringify(newComments, null, 2));
    return json({ success: true });
  } catch (error) {
    console.log("error", error);
    return json({ success: false });
  }
}

//-----------------------------------------------

const SinglePost = () => {
  //   const slug = useLoaderData();
  const { slug, postComments } = useLoaderData();
  const actionData = useActionData();
  console.log("🚀 ~ SinglePost ~ postComments:", postComments);

  const matches = useMatches();

  console.log("matches", matches);
  const posts = matches[1].data.find((item) => item.slug === slug);

  //----------------------------------------------------------------
  //as soon as the user submits the comment, we will show it in
  // the UI and then in the background we will validate it with the server.
  /*
  You can validate the final server response and if all okay, then you do not do anything or change some metadata. Maybe. But if it is an error, you can always remove the comment from the UI.
 */
  const navigation = useNavigation();
  const [comments, setComments] = useState(postComments);

  useEffect(() => {
    // Navigation  form data will hold all the data that is being submitted via the form,
    console.log("navigation.formData ", navigation.formData);
    if (navigation.formData && navigation.formData.get("commentBody")) {
      console.log("HIIIII 99");
      const newComment = {
        id: Date.now(),
        userId: 1,
        postId: parseInt(navigation.formData.get("postId")),
        postSlug: navigation.formData.get("postSlug"),
        body: navigation.formData.get("commentBody"),
        createdAt: new Date(),
      };
      const updatedData = [...comments, newComment];
      console.log("🚀 ~ useEffect ~ updatedData:", updatedData);
      setComments(updatedData);
    }
  }, [navigation.formData]);

  useEffect(() => {
    // remove above that we are shwoing before api success on error remove this
    if (actionData && !actionData.success) {
      setComments(postComments);
    }
  }, [actionData]);

  //----------------------------------------------------------------
  if (Object.keys(posts).length) {
    return (
      <>
        <PostsList posts={[posts]} />
        <br />
        <br />

        <Comments comments={comments} actionData={actionData} />
      </>
    );
  }
  return <h1>No data found for given id</h1>;
};

export default SinglePost;

/*

matches console object


[
    {
        "id": "root",
        "pathname": "/",
        "params": {
            "slug": "react-intro"
        },
        "data": "This is root route"
    },
    {
        "id": "routes/posts",
        "pathname": "/posts",
        "params": {
            "slug": "react-intro"
        },
        "data": [
            {
                "id": 1,
                "userId": 1,
                "author": "John Doe",
                "title": "Introduction to React",
                "createdAt": "2023-05-01T10:00:00Z",
                "content": "React is a popular JavaScript library for building user interfaces. In this post, we'll explore the fundamentals of React and how it works.",
                "slug": "react-intro"
            },
            {
                "id": 2,
                "userId": 2,
                "title": "Mastering CSS Grid",
                "author": "Jane Smith",
                "createdAt": "2023-04-15T14:30:00Z",
                "content": "CSS Grid is a powerful layout system that makes it easy to create complex, responsive grid-based layouts. In this post, we'll dive deep into CSS Grid and learn how to use it effectively.",
                "slug": "css-grid"
            },
            {
                "id": 3,
                "userId": 3,
                "title": "The Future of Web Development",
                "author": "Bob Johnson",
                "createdAt": "2023-03-20T08:00:00Z",
                "content": "The web development landscape is constantly evolving, with new technologies and trends emerging all the time. In this post, we'll explore some of the most exciting developments and predictions for the future of web development.",
                "slug": "future-of-web-development"
            },
            {
                "id": 4,
                "userId": 4,
                "title": "Improving Website Performance",
                "author": "Emily Williams",
                "createdAt": "2023-02-10T16:45:00Z",
                "content": "Website performance is crucial for providing a good user experience and keeping visitors engaged. In this post, we'll discuss various techniques and best practices for optimizing website performance, including code optimization, asset optimization, and performance monitoring.",
                "slug": "improve-website-performance"
            },
            {
                "id": 5,
                "userId": 5,
                "title": "The Rise of JavaScript Frameworks",
                "author": "David Brown",
                "createdAt": "2023-01-25T12:15:00Z",
                "content": "JavaScript frameworks have become increasingly popular in recent years, making it easier to build complex web applications. In this post, we'll explore some of the most popular JavaScript frameworks, such as React, Angular, and Vue.js, and discuss their strengths and use cases.",
                "slug": "javascript-frameworks"
            }
        ]
    },
    {
        "id": "routes/posts.$slug",
        "pathname": "/posts/react-intro",
        "params": {
            "slug": "react-intro"
        },
        "data": "react-intro"
    }
]
    */
