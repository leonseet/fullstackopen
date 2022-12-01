import React from 'react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const { reset: resetContent, ...content } = useField('content')
    const { reset: resetAuthor, ...author } = useField('author')
    const { reset: resetInfo, ...info } = useField('info')

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
      props.setNotification(`a new anecdote ${content.value} created!`)
      setTimeout(() => {
        props.setNotification('')
      }, 5000)
    }

    const handleReset = (e) => {
      e.preventDefault()
      resetContent()
      resetAuthor()
      resetInfo()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
}

export default CreateNew