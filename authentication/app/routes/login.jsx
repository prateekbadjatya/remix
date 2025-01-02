import { useState } from "react";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { createUser, login } from "../db/query";
import { commitSession, getSession } from "../sessions-db";

export async function action({request}){

  const body = await request.formData();
  const _action = body.get("_action")
  const email = body.get('email')
  const password = body.get('password')

  if(_action == "signup"){
    const name = body.get('name')
    const result_signup = await createUser(email, password, name);

    if(result_signup.error){
      return json({error:true, errorMessage: result_signup.errorMessage})
    }else{
      const session = await getSession(
        request.headers.get('Cookie')
      )

      session.set("userId", result_signup.user.id)
      session.set("userName", result_signup.user.name)

      return redirect("/posts", {
        headers: {
          "Set-Cookie": await commitSession(session, {
            expires: new Date(Date.now() + 1000 * 60)
          })
        }
      })
    }

    

  }else if(_action == "login"){

    const result_login = await login(email, password)

    if(result_login.error){
      return json({error:true, errorMessage: result_login.errorMessage})
    }else{
      const session = await getSession(
        request.headers.get('Cookie')
      )

      session.set("userId", result_login.user.id)
      session.set("userName", result_login.user.name)

      return redirect("/posts", {
        headers: {
          "Set-Cookie": await commitSession(session,  {
            expires: new Date(Date.now() + 1000 * 60)
          })
        }
      })
    }


  }else{
    return json({error: true, errorMessage: "Unexpected error"})
  }
}

export default function Login(){
  const actionData = useActionData()
  const [isSignup, setIsSignup] = useState(false);

    const toggleSignup = () => {
        setIsSignup(!isSignup);
    };

    return(
        <>
          <section>
            <div>
              <h2>{isSignup ? 'Signup' : 'Login'}</h2>
              {actionData && actionData?.error && <em style={{color:"red"}}>{actionData?.errorMessage}</em>}
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