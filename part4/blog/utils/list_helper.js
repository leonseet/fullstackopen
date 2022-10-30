lodash = require("lodash")

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((total, curr) => total + curr.likes, 0)
}


const favouriteBlog = (blogs) => {
    const favBlog = blogs.reduce((prev, curr) => {
        return prev.likes > curr.likes
        ? prev
        : curr
    })

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}


const mostBlogs = (blogs) => {
    const authorCount = lodash.countBy(blogs, "author")
    const authorTop = Object.keys(authorCount)
                            .reduce((prev, curr) => authorCount[curr] > authorCount[prev] ? curr : prev)
    return {
        author: authorTop,
        blogs: authorCount[authorTop]
    }
}


const mostLikes = (blogs) => {
    const authorGrouped = lodash.groupBy(blogs, "author")
    const authorLikes = Object.keys(authorGrouped)
                                .map((author) => ({
                                    author: author,
                                    likes: lodash.sumBy(authorGrouped[author], "likes")
                                }))
    const authorTop = authorLikes.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
    return authorTop
}



module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}