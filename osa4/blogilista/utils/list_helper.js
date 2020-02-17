const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  const resultArr = _(blogs).countBy('author').toPairs().max(_.last)

  const result = {
    author: resultArr[0],
    blogs: resultArr[1]
  }

  return result
}

const mostLikes = (blogs) => {
  const resultObj = blogs.reduce((acc, val) => {
    acc[val.author] = acc[val.author] ? acc[val.author] + val.likes : val.likes

    return acc
  }, {})

  var arr = _(resultObj).toPairs().sortBy(0).fromPairs().value()

  const result = {
    author: Object.keys(arr)[0],
    likes: arr[Object.keys(arr)[0]]
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}