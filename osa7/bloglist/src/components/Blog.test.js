import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('does not render expandable content', () => {
  const blog = {
    title: 'uus title',
    author: 'uus author',
    url: 'uus url',
    likes: '15',
    user: {
      username: 'test username',
      name: 'test name',
      id: '5e4aa2b54045cf710dfbd9b7'
    }
  }

  const handleLike = () => {}
  const handleRemove = () => {}

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
  )

  expect(component.container).toHaveTextContent(
    'uus title'
  )

  expect(component.container).toHaveTextContent(
    'uus author'
  )

  expect(component.container).not.toHaveTextContent(
    'uus url'
  )

  expect(component.container).not.toHaveTextContent(
    '15'
  )
})

test('render proper content when expanded', () => {
  const blog = {
    title: 'uus title',
    author: 'uus author',
    url: 'uus url',
    likes: '15',
    user: {
      username: 'test username',
      name: 'test name',
      id: '5e4aa2b54045cf710dfbd9b7'
    }
  }

  const handleLike = jest.fn()
  const handleRemove = jest.fn()

  const loggedUser = { username: 'test' }

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} loggedUser={loggedUser} />
  )

  const clickableText = component.getByText('uus title')
  fireEvent.click(clickableText)

  expect(component.container).toHaveTextContent(
    'uus title'
  )

  expect(component.container).toHaveTextContent(
    'uus author'
  )

  expect(component.container).toHaveTextContent(
    'uus url'
  )

  expect(component.container).toHaveTextContent(
    '15'
  )
})

test('like called', () => {
  const blog = {
    title: 'uus title',
    author: 'uus author',
    url: 'uus url',
    likes: '15',
    user: {
      username: 'test username',
      name: 'test name',
      id: '5e4aa2b54045cf710dfbd9b7'
    }
  }

  const handleLike = jest.fn()
  const handleRemove = jest.fn()

  const loggedUser = { username: 'test' }

  const component = render(
    <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} loggedUser={loggedUser} />
  )

  const clickableText = component.getByText('uus title')
  fireEvent.click(clickableText)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLike.mock.calls.length).toBe(2)
})