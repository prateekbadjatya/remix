import React from 'react'
import { useLocation } from "@remix-run/react";
const DemoPage = () => {
  const location = useLocation();
  console.log("location", location);
  return (
    <div>DemoPage</div>
  )
}

export default DemoPage