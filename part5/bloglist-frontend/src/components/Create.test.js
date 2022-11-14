import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Create from './Create'
import userEvent from '@testing-library/user-event'

describe('<Create />', () => {
  let component
  const createBlogMockHandler = jest.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: 'create blog title',
    author: 'create',
    url: 'www.create.com'
  }

  beforeEach( () => {
    component = render(<Create createBlog={createBlogMockHandler}/>)
  })

  test('renders details when a new blog is created', async () => {
    const titleInput = component.container.querySelector('.title-input')
    const authorInput = component.container.querySelector('.author-input')
    const urlInput = component.container.querySelector('.url-input')
    const createButton = component.container.querySelector('.create-button')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(createButton)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    expect(createBlogMockHandler.mock.calls[0][0].title).toBe(newBlog.title)
    expect(createBlogMockHandler.mock.calls[0][0].author).toBe(newBlog.author)
    expect(createBlogMockHandler.mock.calls[0][0].url).toBe(newBlog.url)
  })
})