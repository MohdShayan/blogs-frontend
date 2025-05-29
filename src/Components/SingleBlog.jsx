import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${blogId}`, {
          withCredentials: true,
        });
        setBlog(res.data.data.blogPost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comment/${blogId}`, {
          withCredentials: true,
        });
        setComments(res.data.data.comments);
        setCommentsLoading(false);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setCommentsLoading(false);
      }
    };

    fetchUser();
    fetchBlog();
    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/comment/${blogId}`,
        { content: commentText },
        { withCredentials: true }
      );
      setComments((prev) => [...prev, res.data.data.comment]);
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#101720] z-30">
        <p className="text-blue-300 text-lg">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101720] text-white flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-white">{blog.title}</h1>

        <img
          src={`http://localhost:3000${blog.coverImageURL}`}
          alt={blog.title}
          className="w-full max-h-[400px] object-cover rounded-xl mb-4"
        />

        {/* Author and Date */}
        <div className="flex justify-between text-sm text-blue-200 italic mb-8">
          <span>Author: {blog.createdBy?.name || "Unknown"}</span>
          <span>Published on: {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Blog Content */}
        <p className="text-lg leading-relaxed whitespace-pre-wrap">{blog.body}</p>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-blue-300 pb-2">
            Comments
          </h2>

          {commentsLoading ? (
            <p className="text-blue-300">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-blue-300">No comments yet.</p>
          ) : (
            <ul className="space-y-4 max-h-80 overflow-y-auto">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-white/10 rounded-lg p-4 border border-blue-200"
                >
                  <p className="text-white">{comment.content}</p>
                  <p className="text-xs text-blue-200 mt-2">
                    — {comment.createdBy?.name || "Anonymous"}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mt-8 flex flex-col gap-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-4 rounded-lg bg-[#17212b] text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              />
              <button
                type="submit"
                className="self-start bg-gradient-to-t from-blue-300 via-blue-100 to-white text-black font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-blue-400 hover:via-blue-200 transition duration-150"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="text-blue-300 mt-6">Please log in to comment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
