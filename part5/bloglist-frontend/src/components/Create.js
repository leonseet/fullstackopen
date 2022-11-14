import { useState } from 'react'


const Create = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    createBlog(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return  (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            className='title-input'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            className='author-input'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            className='url-input'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className='create-button' id="create-btn" type="submit">
                    create
        </button>
      </form>
    </div>
  )
}

export default Create