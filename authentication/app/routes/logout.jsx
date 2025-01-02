import { json, redirect } from "@remix-run/node"
import {destroySession, getSession} from "../sessions-db"

export async function loader({request}){

  const session = await getSession(request.headers.get("Cookie"))

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  })
}

export default function Logout(){
  return <h1>Logging out...</h1>
}