import React from "react";

// importing the css first way second way below
// import '../style.css'
import styles from "../style.css";
export const meta = () => {
  return [{ title: "List" }, { name: "List", content: "Welcome to Remix!" }];
};

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const list = [
  {
    id: 1,
    name: "John",
    title: "chap",
  },
  {
    id: 2,
    name: "Wick",
    title: "shap",
  },
  {
    id: 3,
    name: "Joh, Chaptern",
    title: "mhap",
  },
];

const List = () => {
  return (
    <>
      {list.map((item, index) => {
        return (
          <div className="mt-5 mx-5" key={index}>
            <h1>{item.title}</h1>
            <p>{item.name}</p>
          </div>
        );
      })}
      <button className="btn btn-primary">Submit</button>
    </>
  );
};

export default List;
