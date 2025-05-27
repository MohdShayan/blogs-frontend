import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AllBlogs = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

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
    <>
    <Navbar />
    <div>
        <img
          src="/X.png"
          alt="banner"
          className="w-full"
        />
      </div>
    <div className="min-h-screen bg-[#101720] text-white  py-10">
      <div className="flex flex-col mb-8 justify-items-start items-start px-4 sm:px-6">
      <h1 className="text-3xl font-bold ">All Articles</h1>
      </div>

      <button
        className="bg-pink-400 text-black px-6 py-3 rounded-full hover:bg-pink-500 mb-6"
        onClick={() => setShowForm(true)}
      >
        ✍️ Write a New Blog
      </button>
<div className="flex flex-col items-center">
      {/* Blog Cards */}
      {blogs.length === 0 ? (
        <p className="text-gray-400">No blogs yet. Be the first to write one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden text-white hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              <img
                src={`http://localhost:3000${blog.coverImageURL}`}
                alt="Cover"
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 text-white">{blog.title}</h2>
                <p className="text-sm text-white/80 mb-4 line-clamp-3">{blog.body}</p>
                <div className="text-xs text-white/50 flex justify-between items-center">
                  <span>By: {blog.createdBy?.name || "Unknown"}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

))}
        </div>
      )}
      </div>

      {/* Modal for Creating Blog */}
      {showForm && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
    <div className="relative w-[90%] max-w-xl">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-3 right-4 text-white text-3xl font-bold hover:text-red-400 cursor-pointer z-30"
      >
        &times;
      </button>

      <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create New{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            Blog Post
          </span>
        </h2>

        {message && (
          <p className="text-sm text-center mb-4 text-pink-400">{message}</p>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-1 text-sm">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block mb-1 text-sm">
              Body
            </label>
            <textarea
              id="body"
              required
              placeholder="Write your blog content here..."
              rows="5"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="block mb-1 text-sm">
              Cover Image
            </label>
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              accept="image/*"
              required
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full file:bg-pink-500 file:text-white file:px-4 file:py-2 file:rounded-full file:border-0 file:cursor-pointer text-sm bg-transparent text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-gray-300 to-white text-black font-semibold py-2 rounded-xl hover:from-pink-300 hover:to-white transition duration-150 cursor-pointer shadow-lg hover:shadow-pink-300/30"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
    </>
  );
};

export default AllBlogs;
