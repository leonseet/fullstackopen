import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'test blog',
    author: 'Tester',
    url: 'www.testblog.com',
    likes: 99
  }

  let component
  const updateLikesMockHandler = jest.fn()
  const deleteBlogMockHandler = jest.fn()

  beforeEach( () => {
    component = render(<Blog blog={blog} updateLikes={updateLikesMockHandler} deleteBlog={deleteBlogMockHandler}/>)
  })

  test('renders blog title', () => {
    const blogTitle = component.container.querySelector('.blog-title')
    expect(blogTitle).toHaveTextContent(blog.title)
  })

  test('renders url and number of likes when view button is clicked', async () => {
    const viewButton = component.container.querySelector('.view-button')
    fireEvent.click(viewButton)

    const blogUrl = component.container.querySelector('.blog-url')
    expect(blogUrl).toHaveTextContent(blog.url)

    const blogLikes = component.container.querySelector('.blog-likes')
    expect(blogLikes).toHaveTextContent(blog.likes)
  })

  test('event handler received props twice when like button is clicked twice', async () => {
    const viewButton = component.container.querySelector('.view-button')
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikesMockHandler.mock.calls).toHaveLength(2)
  })
})




