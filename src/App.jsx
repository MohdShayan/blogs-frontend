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
        <div id="home" className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug max-w-4xl">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              AI-Powered&nbsp;
            </span>
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              Blogging Platform&nbsp;
            </span>
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              Supercharged by&nbsp;
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block mt-3 px-2 sm:px-3 py-1 ring-1 ring-white/25 bg-gradient-to-t from-gray-300/20 to-white/20 backdrop-blur rounded-md">
              Groq
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block mt-3 bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white font-bold">
             Write Less, Publish Smart 
            </span>
          </h2>
        </div>
      </div>

      {/* Welcome & Why BlogX */}
      <div  id="about" className="z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center bg-gray-900/50 min-h-screen">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to 
    <span className="text-3-xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white"> BlogX</span>
  </h1>
  
  <p className="text-base sm:text-lg max-w-2xl mb-6">
    Just drop a blog title — and let Groq generate a powerful article for you. Schedule it to go live when you want. AI blogging made effortless.
  </p>
  <a
    href="/signup"
    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mb-10"
  >
    Get Started for Free
  </a>

  <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Choose BlogX?</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
    {[
      {
        title: "AI-Written in Seconds",
        desc: "Give us a title, and BlogX will craft a complete blog post using Groq's powerful LLM.",
      },
      {
        title: "Future-Ready Scheduling",
        desc: "Pick a future date and time — we'll publish your blog automatically when the moment comes.",
      },
      {
        title: "No Writing Needed",
        desc: "Skip the blank page. Let AI do the heavy lifting while you stay focused on ideas.",
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

<div id="howitworks" className="z-10 px-4 sm:px-6 py-12 sm:py-16 bg-gray-900/50 text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-10 mt-5">How It Works</h2>
  <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
    {[
      "Sign up or log in to your BlogX dashboard.",
      "Enter a blog title — our system gets ready to generate your content.",
      "Groq AI generates a full blog post tailored to your topic.",
      "Choose to schedule your blog for later or publish it instantly.",
    ].map((step, i) => (
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
  Join BlogX Now
</a>

      </div>

      <Footer />
    </div>
  );
};

export default App;
