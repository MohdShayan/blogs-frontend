import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);

    try {
      const res = await axios.post(
        "https://blogs-backend-production.up.railway.app/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setTitle("");
      setBody("");
      setCoverImage(null);
      setMessage("✅ Blog created successfully! Redirecting in 3...");

      // Countdown message
      let countdown = 2;
      const countdownInterval = setInterval(() => {
        if (countdown === 0) {
          clearInterval(countdownInterval);
          window.location.href = "/home"; // redirect
        } else {
          setMessage(`✅ Blog created successfully! Redirecting in ${countdown}...`);
          countdown--;
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create blog.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#101720] text-white py-10 pt-18 flex justify-center px-4">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg text-white flex flex-col">
        <div className="flex flex-row justify-between items-center mb-6 align-center">
          <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
              Create New Blog Post
            </h1>
          <div>
            <button onClick={()=>{navigate('/schedule')}} className=" p-3 bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold py-2 rounded-xl hover:from-blue-400 hover:via-blue-200 transition duration-150 cursor-pointer shadow-lg hover:shadow-blue-300/30">Schedule Blog</button>
          </div>
        </div>
          

          {message && (
            <p className="text-sm text-center mb-4 text-blue-300">{message}</p>
          )}

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col flex-1"
          >
            <div className="flex flex-col gap-4 flex-grow">
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
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-8"
                />
              </div>

              <div>
                <label htmlFor="body" className="block mb-1 text-sm">
                  Body
                </label>
                <textarea
                  id="body"
                  required
                  placeholder="Write your blog content here..."
                  value={body}
                  ref={textareaRef}
                  onChange={handleBodyChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none overflow-hidden mb-8"
                  style={{ minHeight: "120px" }}
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm mb-5">
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  required
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="w-full file:bg-blue-300 file:text-black file:px-4 file:py-2 file:rounded-full file:border-0 file:cursor-pointer text-sm bg-transparent text-white"
                />
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold py-2 rounded-xl hover:from-blue-400 hover:via-blue-200 transition duration-150 cursor-pointer shadow-lg hover:shadow-blue-300/30"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
