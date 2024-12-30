import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import picoCSS from './pico.css?url'
import styles from './style.css?url'
import Brand from "./components/Brand";
import NavBar from "./components/Navbar";


export const meta = () => {
  return [
    { title: "Tech Blog | My Blog" }, // Sets the document title shown in the browser tab and SERPs
    {
      name: "description",
      content: "A tech product review blog for cutting edge tech gadgets."
    }, // Describes the page content for search engines
    {
      property: "og:title",
      content: "Page Title for Social Media"
    }, // Defines how the title appears when shared on social media
    {
      property: "og:description",
      content: "Description for Social Media sharing"
    } // Sets the description for social media previews
  ]
}

export const links = () => {
  return [
    {rel:'stylesheet', href: picoCSS},
    {rel:'stylesheet', href: styles}
  ]
}

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
          <NavBar/>
          <Brand/>
        </header>
        <main className="container">
          {children}
        </main>
        <footer>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

