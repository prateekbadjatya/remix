import { json } from "@remix-run/node";
export async function action({ request }) {
  console.log("🚀 ~ about action ~ request :");
  return json({ success: true });
}

export async function loader() {
  return json({ id: 1 });
}

export default function About() {
  return <h1>About page</h1>;
}
