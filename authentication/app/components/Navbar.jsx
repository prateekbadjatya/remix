import { NavLink, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function NavBar({isLoggedin}){
  const location = useLocation();
  
  const [isHideNavBar, setIsHideNavBar] = useState(false)

  useEffect(()=>{
    if(location.pathname.includes("/login")){
      setIsHideNavBar(true)
    }else{
      setIsHideNavBar(false)
    }
  },[location.pathname])

  return (
    <>
    {isHideNavBar ? <></> : 
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
        <li><NavLink to="/logout"
        style={isLoggedin ? {display: "block"} : {display: "none"}}
        >Logout</NavLink></li>
      </ul>
    </nav>}
    </>
    
    
  )
}