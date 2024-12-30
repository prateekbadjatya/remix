import React from "react";

//loader will call before the page load
export async function loader({ params }) {
  const slug = params.slug;
  console.log("slug", slug);

  return slug;
}

const PostsDetails = () => {
  return <h1>signle post details</h1>;
};

export default PostsDetails;
