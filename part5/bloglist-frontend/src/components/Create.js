import { useState } from 'react'


const Create = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newObject = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            likes: 0
        }
        createBlog(newObject)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return  (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input 
                    type="text" 
                    value={title} 
                    name="title" 
                    onChange={({ target }) => setTitle(target.value)} 
                    />
                </div>
                <div>
                    author:
                    <input 
                    type="text" 
                    value={author} 
                    name="author" 
                    onChange={({ target }) => setAuthor(target.value)} 
                    />
                </div>
                <div>
                    url:
                    <input 
                    type="text" 
                    value={url} 
                    name="url" 
                    onChange={({ target }) => setUrl(target.value)} 
                    />
                </div>
                <button id="create-btn" type="submit">
                    create
                </button>
            </form>
        </div>  
        )
    }
  
  export default Create