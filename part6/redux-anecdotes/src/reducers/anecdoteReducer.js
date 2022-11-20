import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    upvote(state, action) {
      const id = action.payload
      const anacdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {...anacdoteToChange, votes: anacdoteToChange.votes + 1}
      return state.map(n => n.id !== id ? n : changedAnecdote)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { upvote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getOne(id)
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(upvote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer