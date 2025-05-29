import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AllBlogs = () => {
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

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div>
        <img
          src="/X.png"
          alt="banner"
          className="w-full rounded-b-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#101720] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* Header and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">📰 All Articles</h1>
            <button
              className="bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:from-blue-400 hover:via-blue-200 transition duration-150"
              onClick={() => navigate("/myblogs")}
            >
              📚 My Blogs
            </button>
          </div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <p className="text-gray-400 text-center">
              No blogs yet. Be the first to write one!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden text-white hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-transform duration-300 cursor-pointer"
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                >
                  <img
                    src={`${blog.coverImageURL}`}
                    alt="Cover"
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-2 text-white">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">
                      {blog.body}
                    </p>
                    <div className="text-xs text-white/50 flex justify-between items-center">
                      <span>By: {blog.createdBy?.name || "Unknown"}</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
