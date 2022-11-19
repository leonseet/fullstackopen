import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { orderBy } from "lodash"

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes
  )
	const dispatch = useDispatch()

	const vote = (id) => {
			console.log('vote', id)
			dispatch(upvote(id))
      dispatch(showNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
      setTimeout(() => dispatch(hideNotification()), 5000)
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
