import React from 'react'
import { Outlet } from "@remix-run/react";

const FigmaPosts = () => {
  return (
   <>
    <h1>Figma design</h1>
    <Outlet/>
   </>
  )
}

export default FigmaPosts