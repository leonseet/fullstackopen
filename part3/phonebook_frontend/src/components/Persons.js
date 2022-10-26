import React from 'react'

const Persons = ({ person, deleteName }) => {
  return (
  <div>
    <p>{person.name} {person.number} <button value={person.name} onClick={deleteName}>delete</button></p>
  </div>
  )
}

export default Persons