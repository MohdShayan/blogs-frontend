import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleBlog = () => {
  const { blogId } = useParams()

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${blogId}`, {
          withCredentials: true
        })
        setBlog(res.data.data.blogPost)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog:", error)
        setLoading(false)
      }
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/me`, {
          withCredentials: true
        })
        setUser(res.data.user)
      } catch (err) {
        setUser(null)
      }
    }

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comment/${blogId}`, {
          withCredentials: true
        })
        setComments(res.data.data.comments)
        setCommentsLoading(false)
      } catch (err) {
        console.error("Error fetching comments:", err)
        setCommentsLoading(false)
      }
    }

    fetchUser()
    fetchBlog()
    fetchComments()
  }, [blogId])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:3000/api/comment/${blogId}`,
        { content: commentText },
        { withCredentials: true }
      )
      setComments(prev => [...prev, res.data.data.comment])
      setCommentText("")
    } catch (err) {
      console.error("Error posting comment:", err)
    }
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen z-30">
          <p className="text-blue-400 text-lg">Loading blog...</p>
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <img
            src={`http://localhost:3000${blog.coverImageURL}`}
            alt={blog.title}
            className="w-full h-auto mb-4 max-w-3xl"
          />
          <p className="text-lg max-w-3xl">{blog.body}</p>
          <div className="flex flex-col justify-between items-center mt-4">
            <p className="text-sm text-gray-400">Author: {blog.createdBy.name}</p>
            <p className="text-sm text-gray-400">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>

        
          <div className="mt-10 w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {commentsLoading ? (
              <p className="text-gray-400">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-400">No comments yet.</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((comment) => (
                  <li key={comment._id} className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-gray-300">{comment.content}</p>
                    <p className="text-xs text-gray-500 mt-1">— {comment.createdBy?.name || "Anonymous"}</p>
                  </li>
                ))}
              </ul>
            )}

           
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full p-3 rounded bg-gray-700 text-white"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-400 mt-4">Please log in to comment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleBlog
