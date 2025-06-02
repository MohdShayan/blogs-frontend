import React, { useState } from 'react'
import axios from 'axios'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', body)
    formData.append('coverImage', coverImage) 

    try {
      const res = await axios.post('https://blogs-backend-production.up.railway.app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      })

      
      setMessage('✅ Blog created successfully!')
      
    } catch (err) {
      console.error('Upload error:', err)
      setMessage('❌ Failed to create blog.')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>

      {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Body</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="5"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            required
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
