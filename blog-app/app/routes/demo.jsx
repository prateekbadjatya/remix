//-------------handle Multiple form submission-------------------------------------------
import {
  Form,
  json,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { fakeDelay } from "../utils/helpers";

let fruits = [];

export async function loader({ params, request }) {
  // console.log("🚀 ~ loader ~ request:", request)
  // example: http://localhost:5173/demo?key=121
  const url = new URL(request.url);
  const queryParam = url.searchParams.get("key");
  console.log("🚀 ~ loader ~ queryParam:", queryParam);

  await fakeDelay(2000);
  return fruits;
}

export async function action({ request }) {
  const body = await request.formData();
  // name value in form
  const _action = body.get("_action");

  if (_action == "create") {
    const addFruit = body.get("addFruit");
    fruits = [...fruits, addFruit];
  } else if (_action == "delete") {
    await fakeDelay(3000);
    const fruitNameToDelete = body.get("fruitName");
    const index = fruits.findIndex((fruit) => fruit === fruitNameToDelete);
    if (index !== -1) {
      fruits.splice(index, 1);
    }
  }

  return json({ success: true });
}

export default function Demo() {
  const fruits = useLoaderData();
  return (
    <>
      <section>
        <ul>
          {fruits.map((item, index) => (
            <FruitsList item={item} index={index} />
          ))}
        </ul>
      </section>
      <section>
        <Form method="POST">
          <input type="text" name="addFruit" placeholder="Add a fruit" />
          <button type="submit" name="_action" value="create">
            Add
          </button>
        </Form>
      </section>
    </>
  );
}

export function FruitsList({ item, index }) {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  // I have use fetcher form here becuase becuase when use click delete button of all the list then previous request got cancelled
  // and only last request will considerd in the remix form
  // this is the reason i used fethcer form here
  return (
    <li
      key={index}
      style={{
        opacity: fetcher?.formData?.get("fruitName") == item ? 0.25 : 1,
        background:
          fetcher?.formData?.get("fruitName") == item ? "red" : "white",
      }}
    >
      <div className="grid">
        <p>{item}</p>
        <fetcher.Form method="POST">
          <input type="hidden" name="fruitName" value={item} />
          <button
            type="submit"
            name="_action"
            value="delete"
            style={{ width: "50px" }}
          >
            X
          </button>
        </fetcher.Form>
      </div>
    </li>
  );
}

//--------------------------------------------------------

//---------------------useFetcher----------------------------------------------
// import { json } from "@remix-run/node";
// import fs from "fs/promises";
// import React, { useEffect } from "react";
// import {
//   useNavigation,
//   Link,
//   NavLink,
//   useLoaderData,
//   useMatches,
//   useNavigate,
//   Form,
//   useSubmit,
//   useFetcher,
//   useActionData,
// } from "@remix-run/react";

// export async function loader() {
//   return [];
// }

// export async function action({ request }) {
//   const body = await request.formData();
//   const slug = body.get("slug");
//   console.log("🚀 ~ action ~ slug:", slug);
//   return slug;
// }
// export default function Demo() {
//   const submit = useSubmit();
//   let fetcher = useFetcher();
//   console.log("🚀 ~ Demo ~ fetcher:", fetcher?.data);

//   useEffect(() => {
//     // ftecher load will load the data from loader of given route
//     // console.log("fetcher load.", fetcher.load("/posts"));
//     console.log("fetcher load.", fetcher.load("/about"));
//   }, []);

//   const actionData = useActionData();
//   console.log("🚀 ~ Demo ~ actionData:", actionData);
//   return (
//     <>
//       <h1>Demo Page</h1>
//       {/* html form   page will redirect to about route*/}
//       <form method="post" action="/about">
//         <label>
//           html form Slug:
//           <input type="text" name="slug" />
//         </label>
//         <br />
//         <button type="submit">Create</button>
//       </form>

//       <br />
//       {/* remix form  page will redirect to about route */}
//       {/* In remix we stop naigation by using naviagte props to false
//       but the downfall using navigate is that it will not return the action data  */}
//       <Form method="post" action="/about">
//         <label>
//           remix form Slug::
//           <input type="text" name="slug" />
//         </label>
//         <br />
//         <button type="submit">Create</button>
//       </Form>

//       <br />
//       {/* form submition happen but no redirection happend */}
//       {/* UseFtehcer example  page will not redirect to about route */}
//       <div>
//         {/* <fetcher.Form method="post" action={`/posts/${postId}/like`}> */}
//         <fetcher.Form method="post" action="/about">
//           {/* on click call the action method */}
//           <label>
//             fetcher form form Slug::
//             <input type="text" name="slug" />
//           </label>
//           <br />
//           <button type="submit" disabled={fetcher.state === "submitting"}>
//             {fetcher.state === "submitting" ? "Creating..." : "Create"}
//           </button>
//         </fetcher.Form>
//       </div>
//     </>
//   );
// }
//-----------------------------------------------------------------

/*

//----------------useSubmit Hook Example---------------------

// import { json } from "@remix-run/node";
// import fs from "fs/promises";
import React from "react";
import {
  useNavigation,
  Link,
  NavLink,
  useLoaderData,
  useMatches,
  useNavigate,
  Form,
  useSubmit,
} from "@remix-run/react";

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

export async function action({ request }) {
  const body = await request.formData();
  const slug = body.get("slug");
  console.log("🚀 ~ action ~ slug:", slug);
  return slug;
}
export default function Demo() {
  const submit = useSubmit();
  const handleOnClick = (event) => {
    console.log("hii handle onClick");
    const formData = new FormData();
    formData.append("slug", "test");
    submit(formData, { method: "post" });
  };
  return (
    <>
      <h1>Demo Page</h1>
      <Form method="post">
        <label>
          Slug:
          <input type="text" name="slug" />
        </label>
        <br />
        <button type="submit">Create</button>
      </Form>
      <button onClick={handleOnClick}>create 2</button>
    </>
  );
}



*/
