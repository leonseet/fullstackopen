import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  let sum = parts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.exercises
  },0)
  return <p><strong>Number of exercises {sum}</strong></p>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map( part => <Part key={part.id} part={part} />)}   
  </>

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

const Courses = ({ courses }) => {
  return <div>{courses.map( c => <Course key={c.id} course={c} />)}</div>
}

export default Courses