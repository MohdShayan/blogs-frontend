import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useState,useEffect } from "react";
const App = () => {

  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % 4); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const steps = ["Sign Up", "Connect Grok", "Set Frequency", "Publish Blogs"];

  return (
    <div className="landing-container w-full bg-black text-white">
      <Navbar />

      {/* Full-screen Video Hero */}
      <div className="w-full h-screen overflow-hidden relative">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          src="./hero.webm"
        />
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug max-w-4xl">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              AI-Powered&nbsp;
            </span>
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              Blog&nbsp;
            </span>
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              Platform Powered by&nbsp;
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block mt-3 px-2 sm:px-3 py-1 ring-1 ring-white/25 bg-gradient-to-t from-gray-300/20 to-white/20 backdrop-blur rounded-md">
              Grok & X
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block mt-3 bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white font-bold">
              Turning Trends Into Words
            </span>
          </h2>
        </div>
      </div>

      {/* Welcome & Why TrendWrite */}
      <div className="z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center bg-gray-900/50 min-h-screen">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to TrendWrite</h1>
        <p className="text-base sm:text-lg max-w-2xl mb-6">
          Discover blogs written by AI on what’s trending right now on X. No manual effort. Just insights.
        </p>
        <a
          href="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mb-10"
        >
          Get Started for Free
        </a>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Choose TrendWrite?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            {
              title: "AI-Written Content",
              desc: "Blog posts are created using Grok based on real-time trending topics on X.",
            },
            {
              title: "Custom Frequency",
              desc: "Set your blog publishing schedule – daily, weekly, or whenever you want.",
            },
            {
              title: "Auto Publish",
              desc: "No manual steps. Once configured, your blogs are published automatically.",
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-lg backdrop-blur border border-white/10 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
       
      <div className="z-10 px-4 sm:px-6 py-12 sm:py-16 bg-gray-900/50 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">How It Works</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg transition duration-300 ${
                i === highlightIndex
                  ? "border-blue-500 shadow-md shadow-blue-500/50 bg-blue-900/20"
                  : "border-white/20"
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-1">{i + 1}</div>
              <p className="text-sm sm:text-base">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Preview */}
      <div className="z-10 px-4 sm:px-6 py-12 sm:py-16 bg-gray-900/50 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trending Topics Preview</h2>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          See what your next blog might be about 👇
        </p>
        <div className="bg-white/5 p-6 rounded-lg max-w-2xl mx-auto border border-white/10">
          <p className="text-lg sm:text-xl font-semibold mb-2">🌍 Trending Topic: "AI vs Human Creativity"</p>
          <p className="text-gray-300 text-sm sm:text-base">
            Write a Blog on the most trending Tech Topic 
          </p>
        </div>
      </div>

      {/* CTA */}
     <div className="z-10 px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-black text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Start Writing Smarter?</h2>
        <p className="text-base sm:text-lg mb-6">
          Join the creators leveraging Grok and AI to write with purpose, consistency, and impact.
        </p>
       <a
  href="/signup"
  className="bg-gradient-to-t from-white to-gray-100 text-black font-semibold px-6 py-3 rounded-lg transition duration-300 hover:from-blue-300 hover:to-blue-50"
>
  Join TrendWrite Now
</a>

      </div>

      <Footer />
    </div>
  );
};

export default App;
