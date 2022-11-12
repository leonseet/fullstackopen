import { useState } from 'react'

const Blog = ({blog, updateLikes, deleteBlog}) => {
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
        {blog.title}
        <button id="viewblog-btn" onClick={toggleView}>
          view
        </button> 
      </div> :
      <div>
        <div>
          {blog.title}<button id="hideblog-btn" onClick={toggleView}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}<button id="like-btn" onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          <button id="remove-btn" onClick={handleDelete}>remove</button>
        </div>
      </div>
    }
    </div>
  )
}

export default Blog