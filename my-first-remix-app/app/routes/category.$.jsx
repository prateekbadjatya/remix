import { useParams } from "@remix-run/react";

// export function loader({ params }) {
//   const param = params["*"];
//   console.log("slug", param);

//   return param;
// }

const Category = () => {
  const { "*": restOfPath } = useParams();
  return <h1>Category decleration: {restOfPath}</h1>;
};

export default Category;
