import React from "react";
import { useLoaderData } from "@remix-run/react";
import posts from "../../posts.json";

export async function loader() {
  return posts;
}
const Posts = () => {
  const data = useLoaderData();
  return (
    <>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
