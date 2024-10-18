import React from 'react'
import { HoverEffect } from './ui/card-hover-effect';

export const projects = [
  {
    title: "Cladious Opoku ",
    description:
      "Junior Software Engineer",
    link: "",
  },
  {
    title: "Henry Amos",
    description:
      "Junior FullStack Engineer",
    link: "",
  },
];
const TeamCard = () => {
  return (
    <div className='max-w-5xl mx-auto px-2'>
      <HoverEffect items={projects}/>
    </div>
  )
}

export default TeamCard