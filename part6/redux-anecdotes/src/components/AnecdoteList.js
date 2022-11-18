import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { orderBy } from "lodash"

export const AnecdoteList = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = (id) => {
			console.log('vote', id)
			dispatch(upvote(id))
			}

	const sortedAnecdotes = orderBy(anecdotes, ["votes"], "desc")
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
