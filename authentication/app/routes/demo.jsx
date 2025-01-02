import { json, Form } from "@remix-run/react"
import { getAllPosts, getCommentsByPostSlug } from "../db/query"
import { useState } from "react"

export async function loader(){

    const result = await getCommentsByPostSlug("post-1")
    //console.log(result)

    return json({success:true})
}

export default function Demo(){
    const [isSignup, setIsSignup] = useState(false);

    const toggleSignup = () => {
        setIsSignup(!isSignup);
    };

    return(
        <>
            <h1>Demo page</h1>
            <section>
          <div>
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>
            <Form method="post">
              {isSignup && (
                <div>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name"/>
                </div>
              )}
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"/>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"/>
              </div>
              <button type="submit" name="_action" value={isSignup ? 'signup' : 'login'}>{isSignup ? 'Signup' : 'Login'}</button>
            </Form>
            <p>
              {isSignup ? 'Already a member?' : 'Not a member?'}
              <a style={{cursor:"pointer"}} onClick={toggleSignup}>
                {isSignup ? ' Login' : ' Signup'}
              </a>
            </p>
          </div>
        </section>
            
        </>
    )
}