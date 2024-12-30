import React from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader() {
  //   const body = JSON.stringify({ message: "Hello, Remix!" });
  //   return new Response(body, {
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //   });

  //-------------------------------------------------------------------
  const data = { message: "Hello, Remix!" };
  return json(data, { status: 200 });
}
const Demo = () => {
  const data = useLoaderData();
  return <h1>{data.message}</h1>;
};

export default Demo;
