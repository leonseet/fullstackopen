import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs )
    )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const createBlog = async (newObject) => {
    try {
      const response = await blogService.create(newObject)
      setBlogs(blogs.concat(response))
      setMessage(`${newObject.title} has been added by ${newObject.author}`)
    } catch (error) {
      setMessage(error.response.data.error)
    }

  }

  return (
    <div>
      {user === null ?
      <div>
        <Login username={username} 
        password={password} 
        setUsername={setUsername} 
        setPassword={setPassword} 
        handleLogin={handleLogin} />
      </div> :
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button id="logout-btn" onClick={handleLogout}>
              logout
          </button> 
        </div>
        <br></br>
        <Create createBlog={createBlog} />
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}     
      </div>
      }
    </div>
  )
}

export default App
