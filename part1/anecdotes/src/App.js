import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button> 
const Header = ({ text }) => <h1>{text}</h1>
const Anecdote = ({ anecdote }) => <p>{anecdote}</p>
const Vote = ({ point }) => <p>has {point} votes</p>

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    return setPoints(copy)
  }

  const handleAnecdoteClick = () => {
    return setSelected(randomIntFromInterval(0, anecdotes.length-1))
  }

  const max = Math.max(...points)
  const index = points.indexOf(max)

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Vote point={points[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleAnecdoteClick} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[index]} />
      <Vote point={points[index]} />
    </div>
  )
}

export default App