import { useState } from 'react'

const Blog = ({blog}) => {
  const [toggleBlogView, setToggleBlogView] = useState(false)

  const toggleView = () => {
    setToggleBlogView(!toggleBlogView)
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
          likes {blog.likes}<button id="like-btn">like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    }
    </div>
  )
}

export default Blog