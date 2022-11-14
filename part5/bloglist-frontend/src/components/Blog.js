import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [toggleBlogView, setToggleBlogView] = useState(false)

  const toggleView = () => {
    setToggleBlogView(!toggleBlogView)
  }

  const handleLike = () => {
    const newObject = {
      ...blog,
      likes: blog.likes + 1
    }
    updateLikes(blog.id, newObject)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="bloglist">
      {
        toggleBlogView === false ?
          <div>
            <span className="blog-title">{blog.title}</span>
            <button className='view-button' id="viewblog-btn" onClick={toggleView}>
              view
            </button>
          </div> :
          <div>
            <div>
              {blog.title}<button className='hide-button' id="hideblog-btn" onClick={toggleView}>hide</button>
            </div>
            <div>
              <span className='blog-url'>{blog.url}</span>
            </div>
            <div>
              likes <span className='blog-likes'>{blog.likes}</span>
              <button className='like-button' id="like-btn" onClick={handleLike}>like</button>
            </div>
            <div className='blog-author'>
              {blog.author}
            </div>
            <div>
              <button className='remove-button' id="remove-btn" onClick={handleDelete}>remove</button>
            </div>
          </div>
      }
    </div>
  )
}

export default Blog