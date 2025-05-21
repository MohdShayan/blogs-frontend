import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleBlog = () => {

    const { blogId } = useParams()
  console.log("Blog ID:", blogId)

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/blogs/${blogId}`, {
          withCredentials: true,
        })
        console.log("Fetched Blog:", response.data.data.blogPost)
        setBlog(response.data.data.blogPost)
        setLoading(false) 
      } catch (error) {
        console.error("Error fetching blog:", error)
        setLoading(false) 
      }
    }

    fetchBlog()
  }, [blogId]) // Include blogId as a dependency

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen z-30">
          <p className="text-blue">Loading...</p>
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
            <div className="flex  flex-col justify-between items-center mt-4">
                <p className="text-sm text-gray-400">Author: {blog.createdBy.name}</p>
                <p className="text-sm text-gray-400">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
        </div>

      )}
    </div>
  )
}

export default SingleBlog
