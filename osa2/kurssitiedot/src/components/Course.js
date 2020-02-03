import React from 'react'

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map(part => <Part key={part.id} part={part} />)
      }
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((a, c) => a + c.exercises, 0)

  return (
    <b>total of {total} exercises</b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default Course