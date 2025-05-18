import React, { useEffect, useState } from "react";
import axios from "axios";

const ExploreTrends = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      setError("");

      try {
        // Replace with your actual API endpoint for trends
        const response = await axios.get("http://localhost:3003/trends");
        setTrends(response.data.trends || []);
      } catch (err) {
        setError("Failed to load trends. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="min-h-screen relative bg-black flex flex-col items-center justify-start text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Explore Trending Topics
      </h1>

      {loading && (
        <div className="text-gray-400 text-lg">Loading trends...</div>
      )}

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {!loading && !error && trends.length === 0 && (
        <div className="text-gray-400">No trending topics available right now.</div>
      )}

      <ul className="w-full max-w-3xl space-y-4">
        {trends.map((trend, index) => (
          <li
            key={index}
            className="bg-gray-900/50 border border-white/20 rounded-lg p-4 hover:bg-gray-800 transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{trend.title}</h2>
            <p className="text-gray-300 mt-1">{trend.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExploreTrends;
