import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ScheduleBlogs = () => {
  const [apiKey, setApiKey] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [scheduledBlogs, setScheduledBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [keyMessage, setKeyMessage] = useState("");

  const navigate = useNavigate();

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      setKeyMessage("Please enter your Groq API key.");
      return;
    }

    try {
      setKeyMessage("Saving...");
      await axios.post(
        "https://blogs-backend-production.up.railway.app/user/api/save-key",
        { groqApiKey: apiKey },
        { withCredentials: true }
      );
      setKeyMessage("API key saved successfully!");
    } catch (error) {
      setKeyMessage(
        error.response?.data?.message || "Failed to save API key."
      );
    }
  };

  const handleSchedule = async () => {
    if (!title || !date) {
      setMessage("Title and date are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        "https://blogs-backend-production.up.railway.app/api/schedule-blog",
        {
          title,
          publishAt: date,
        },
        { withCredentials: true }
      );
      setMessage("Blog scheduled successfully!");
      setTitle("");
      setDate("");
      fetchScheduledBlogs();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error scheduling blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledBlogs = async () => {
    try {
      const res = await axios.get("https://blogs-backend-production.up.railway.app/api/scheduled", {
        withCredentials: true,
      });
      setScheduledBlogs(res.data.data.scheduledBlogs || []);
    } catch (error) {
      console.error("Error fetching scheduled blogs:", error);
    }
  };

  useEffect(() => {
    fetchScheduledBlogs();
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

      {/* Main Container */}
      <div className="min-h-screen bg-[#101720] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* Header & Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
              ⏰ Scheduled Blogs
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:from-blue-400 hover:via-blue-200 transition duration-150"
                onClick={() => navigate("/home")}
              >
                📰 All Articles
              </button>
              <button
                className="bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:from-blue-400 hover:via-blue-200 transition duration-150"
                onClick={() => navigate("/myblogs")}
              >
                📚 My Blogs
              </button>
            </div>
          </div>

          {/* Schedule Form */}
          <div className="bg-[#1c2735] backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">
              Schedule a New Blog
            </h2>

            {/* API Key */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-white">
                Groq API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Groq API key"
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              />
              <button
                onClick={handleSaveApiKey}
                className="mt-3 bg-green-600 px-5 py-2 rounded-xl hover:bg-green-700 transition"
              >
                Save API Key
              </button>
              {keyMessage && (
                <p className="mt-2 text-yellow-400">{keyMessage}</p>
              )}
            </div>

            {/* Title & Date */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
              <div>
                <label className="block mb-1 font-medium text-white">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-white">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>
            </div>

            <button
              onClick={handleSchedule}
              disabled={loading}
              className="bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:from-blue-400 hover:via-blue-200 transition duration-150"
            >
              {loading ? "Scheduling..." : "Schedule Blog"}
            </button>
            {message && <p className="mt-4 text-yellow-400">{message}</p>}
          </div>

          {/* Scheduled Blogs Grid */}
          {scheduledBlogs.length === 0 ? (
            <p className="text-gray-400 text-center">
              No scheduled blogs yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheduledBlogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden text-white hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={blog.coverImageURL}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">
                      {blog.body}
                    </p>
                    <div className="text-xs text-white/50 flex justify-between items-center">
                      <span>By: {blog.createdBy?.name || "Unknown"}</span>
                      <span>
                        Scheduled at: {new Date(blog.publishAt).toLocaleString()}
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

export default ScheduleBlogs;






