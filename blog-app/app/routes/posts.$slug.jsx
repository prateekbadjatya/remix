import React from "react";
import { Link, NavLink, useLoaderData, useMatches, useNavigate } from "@remix-run/react";
// import posts from "../../data.json";
import PostsList from "../components/PostsList";

export async function loader({ params }) {
  const slug = params.slug;
  // const data = posts.find((item) => item.slug === slug);
  // return data ?? {};
  return slug;
}

const SinglePost = () => {
  const slug = useLoaderData();

  const matches = useMatches();

  console.log('matches', matches)
  const posts = matches[1].data.find((item) => item.slug === slug);


  if (Object.keys(posts).length) {
    return <PostsList posts={[posts]} />;
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