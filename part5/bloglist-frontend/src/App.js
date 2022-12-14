import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs )
      )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (newObject) => {
    try {
      const response = await blogService.create(newObject)
      setBlogs(blogs.concat(response))
      setIsError(false)
      setMessage(`${newObject.title} has been added by ${newObject.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (blogId, newObject) => {
    try {
      const response = await blogService.update(blogId, newObject)
      const updatedBlogs = blogs.map(blog => blogId === response.id ? response : blog)
      setBlogs(updatedBlogs)
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.destroy(blogId)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
      setBlogs(updatedBlogs)
      setIsError(false)
      setMessage('Blog deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification message={message} isError={isError}/>
          <Login username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin} />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={message} isError={isError}/>
          <div>
            {user.name} logged in
            <button id="logout-btn" onClick={handleLogout}>
              logout
            </button>
          </div>
          <br></br>
          <Togglable id="newnote-button" buttonLabel="new note">
            <Create createBlog={createBlog} />
          </Togglable>
          <div id="blogs">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog}/>)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App
