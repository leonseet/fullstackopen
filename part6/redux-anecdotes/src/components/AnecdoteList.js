import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification, setNotification } from '../reducers/notificationReducer'
import { orderBy } from "lodash"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes
  )
	const dispatch = useDispatch()

	const vote = (id) => {
			console.log('vote', id)
			dispatch(incrementVote(id))
      dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`, 5000))
			}

	const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"])

  return (
    <div>
        {sortedAnecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList