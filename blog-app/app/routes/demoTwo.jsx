import { Form, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React, { useEffect } from "react";
import { json } from "@remix-run/node";

export async function action({ request }) {
  throw new Error("something went wrong");
  return json({success: true})
}
const DemoTwo = () => {
  useEffect(() => {
    // throw new Error("something went wrong");
  }, []);

  return (
    <>
      <div>DemoTwo</div>
      <Form method="post">
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

// every route must have error boundary component

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    // Now this will identify if this is an error response or if it is not.

    // If it is an error response then we will return a customized  layout here.

    return (
      <div>
        <h1> this is an error message {error.status}</h1>
      </div>
    );
  }
  return <h1>This is Error Boundary on demo Two: : {error.message}</h1>;
}

export default DemoTwo;
