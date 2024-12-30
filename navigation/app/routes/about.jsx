import { useNavigate } from "@remix-run/react";

// this will render because we use Meta component in root.jsx
//add this in root route then it will display in all the pages

export const meta = ({ matches }) => {
  console.log("matches", matches);
  //The matches parameter is an array of root objects that match the current URL.

  // Now from this matches you can retrieve the parent metadata.
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  console.log("parentMeta", parentMeta);
  return [
    ...parentMeta,
    { name: "description", content: "This is custom blog" },
  ];
  // return [
  //   { title: "New About Page" },
  //   { name: "description", content: "Welcome to Remix!" },
  // ];
};

export default function AboutPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic here
    navigate("/posts");
  };

  return (
    <div>
      <h1>Login </h1>
      <button onClick={handleLogin}>Posts</button>
    </div>
  );
}
