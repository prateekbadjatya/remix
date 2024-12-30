import { Link, useNavigate } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  return (
    <>
    <h1>Landing page</h1>
    </>

    
  )
}