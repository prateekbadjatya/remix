import { createCookieSessionStorage } from "@remix-run/node";

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: "__session",
    domain: "localhost",
    httpOnly: true,
    maxAge: 60 * 5,
    sameSite: "lax",
    secrets: ["12345"],
    secure: true
  }
})

export {getSession, commitSession, destroySession}