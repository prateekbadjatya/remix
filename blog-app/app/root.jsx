import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import picoCSS from "./pico.css?url";
import styles from "./style.css?url";
import Brand from "./components/Brand";
import NavBar from "./components/Navbar";

export const meta = () => {
  return [
    { title: "Tech Blog | My Blog" }, // Sets the document title shown in the browser tab and SERPs
    {
      name: "description",
      content: "A tech product review blog for cutting edge tech gadgets.",
    }, // Describes the page content for search engines
    {
      property: "og:title",
      content: "Page Title for Social Media",
    }, // Defines how the title appears when shared on social media
    {
      property: "og:description",
      content: "Description for Social Media sharing",
    }, // Sets the description for social media previews
  ];
};

export const links = () => {
  return [
    { rel: "stylesheet", href: picoCSS },
    { rel: "stylesheet", href: styles },
  ];
};

export async function loader() {
  return "This is root route";
}

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <NavBar />
          <Brand />
        </header>
        <main className="container">{children}</main>
        <footer></footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// When there is an error in your out component, then the error boundary will render the same like react,

// but in remix, if you have nested routes, you can define route specific error boundary so that if any

// error happens, then only that route will show the error boundary, whereas the other routes will display

// as normal.

// Also in remix you can handle your errors in the server side.

// For example, the error that happens in the loader function or in the action function.

// Now the name error boundary is significant because by this name remix will understand that it has to

// uh, call this component whenever an error happens in any route.

// So you cannot you cannot name it differently.

// It has to be named as this error boundary.

// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
  // remix will reach tothe nearest error boundary in the nested route if not found then root route error boundary
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
  return <h1>This is Error Boundary : {error.message}</h1>;
}
