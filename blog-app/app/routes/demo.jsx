import { json } from "@remix-run/node";
import fs from "fs/promises";

export async function loader() {
  // const data = {"key": "value"}
  // const body = JSON.stringify(data)

  // return json({key1: "value1"}, {status: 404})

  // const pdf = await generatePDF();
  // const pdf = await fs.readFile("app/example.pdf")
  // return new Response(pdf, {
  //     headers:{
  //         "Content-type": "application/pdf"
  //     },
  //     status: 200,
  // })
  return [];
}

export default function Demo() {
  return <h1>Demo page</h1>;
}
