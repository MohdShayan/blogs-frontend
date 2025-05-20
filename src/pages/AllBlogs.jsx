import React, { useState, useEffect } from "react";
import axios from "axios";

const AllBlogs = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs", {
        withCredentials: true,
      });
      setBlogs(response.data.data.allBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("Blog Created:", res.data);
      setMessage("✅ Blog created successfully!");
      setTitle("");
      setBody("");
      setCoverImage(null);
      setShowForm(false);
      fetchBlogs(); // refresh blog list
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Failed to create blog.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">All Blogs</h1>
      <p className="text-gray-300 mb-6">Explore or share your stories with the world</p>

      <button
        className="bg-pink-400 text-black px-6 py-3 rounded-full hover:bg-pink-500 mb-6"
        onClick={() => setShowForm(true)}
      >
        ✍️ Write a New Blog
      </button>

      {/* Blog Cards */}
      {blogs.length === 0 ? (
        <p className="text-gray-400">No blogs yet. Be the first to write one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl shadow-lg overflow-hidden text-white hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`http://localhost:3000${blog.coverImageURL}`}
                alt="Cover"
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">{blog.body}</p>
                <div className="text-xs text-gray-400 flex justify-between items-center">
                  <span>By: {blog.createdBy?.name || "Unknown"}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Creating Blog */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-[90%] max-w-xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-white text-2xl font-bold hover:text-red-500"
            >
              &times;
            </button>

            <div className="bg-white bg-opacity-10 backdrop-blur-xl border border-black border-opacity-20 rounded-2xl shadow-2xl p-6 text-black">
              <h2 className="text-xl font-bold mb-4 text-center">Create New Blog Post</h2>
              {message && <p className="text-sm text-center mb-4">{message}</p>}

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
              >
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block mb-1 font-semibold text-black">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-white border border-black border-opacity-30 focus:outline-none"
                  />
                </div>

                {/* Body */}
                <div>
                  <label htmlFor="body" className="block mb-1 font-semibold text-black">
                    Body
                  </label>
                  <textarea
                    id="body"
                    required
                    placeholder="Write your blog content here..."
                    rows="5"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-white border border-black border-opacity-30 focus:outline-none"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label
                    htmlFor="coverImage"
                    className="block mb-1 font-semibold text-black"
                  >
                    Cover Image
                  </label>
                  <input
                    id="coverImage"
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    required
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="w-full file:bg-pink-500 file:text-white file:px-4 file:py-2 file:rounded-full file:border-0 file:cursor-pointer text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 w-full py-2 rounded text-white font-semibold"
                >
                  Submit Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
