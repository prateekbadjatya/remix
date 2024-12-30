import { NavLink } from "@remix-run/react";

export default function NavBar(){
  return (
    <nav>
      <ul>
        <li><NavLink to="/" 
        style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "red" : "black",
            };
        }}
        >Home</NavLink></li>
        <li><NavLink to="/posts"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "red" : "black",
          };
        }}
        >Posts</NavLink></li>
        <li><NavLink to="/about"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "red" : "black",
          };
        }}
        >About</NavLink></li>
        <li><NavLink to="/demo"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "red" : "black",
          };
        }}
        >Demo</NavLink></li>
      </ul>
    </nav>
  )
}