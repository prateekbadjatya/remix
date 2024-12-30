import React from 'react'
import {useLoaderData} from '@remix-run/react'




export async function loader() {
    const score = [{id:1,run:2}, {id:2, run:3}]
    return score
}
const MatchScore = () => {
    const score = useLoaderData()
  return (
   <>
    <h1>matchScore</h1>
   { 
   
    score.map(s=>{
            return <h1 key={s.id}>{s.id}</h1>
        })
    
    }
    </>
  )
}

export default MatchScore