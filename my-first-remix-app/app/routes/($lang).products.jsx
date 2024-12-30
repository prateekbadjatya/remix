import React from 'react'

//http://localhost:5173/products
//http://localhost:5173/en/products
//http://localhost:5173/fr/products

export async function loader({ params }) {
    const slug = params.lang;
    console.log("slug", slug);
  
    return slug;
  }

  
const Products = () => {
  return (
    <h1>Products details</h1>
  )
}

export default Products