import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,Form,
  useRouteError,
  isRouteErrorResponse
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

export function ErrorBoundary(){
  const error = useRouteError()
  // console.log("error:",error)
  if(isRouteErrorResponse(error)){
    return (
      <div style={errorStyles.container}>
        <h1 style={errorStyles.title}>{error.status} {error.statusText}</h1>
        <p style={errorStyles.content}>{error.data}</p>
      </div>
    )
  }else{
    return(
      
      <div style={errorStyles.container}>
        <h2 style={errorStyles.title}>{error.message}</h2>
        <pre>{error.stack}</pre>
      </div>
      
    )
  }
  
}

const errorStyles = {
  container: {
    padding: '20px',
    border: '2px solid #ff0000',
    borderRadius: '5px',
    backgroundColor: '#ffe6e6',
    minWidth:'400px',
    margin: 'auto',
    textAlign: 'center',
    wordWrap: 'break-word', // Allow text wrapping
  },
  title: {
    color: '#ff0000',
    fontSize: '24px',
    marginBottom: '10px',
  },
  content: {
    color: '#555',
    fontSize: '14px',
    maxWidth: '100%',
    
  },
};
