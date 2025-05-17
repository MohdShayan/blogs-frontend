import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="landing-container relative w-full h-screen bg-black/90">
      <Navbar />

      <video
        className="absolute top-0 left-0 w-full h-[90vh] object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        src="./hero.webm"
      />

      <div className="relative z-10 flex flex-col h-[90vh] text-white px-4">
        <h2 className="text-center text-3xl md:text-5xl font-semibold leading-tight mt-40 font-bold">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            AI-Powered&nbsp;
          </span>
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            Blog&nbsp;
          </span>
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            Platform Powered by &nbsp;
          </span>

          <br className="hidden md:block" />

          <span className="inline-block text-white ring-1 ring-white/25 bg-gradient-to-t from-gray-300/20 to-white/20 backdrop-blur rounded-md md:px-3 px-1 mr-2 mt-1 md:mx-0 md:mt-0">
            Grok & X&nbsp;
          </span>

          <br className="hidden md:block" />

          <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white pb-3">
            Turning Trends Into Words
          </span>
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-white px-4 py-16">
        <h1 className="text-5xl font-bold mb-6">Welcome to TrendWrite</h1>
        <p className="text-lg mb-4">
          Discover blogs written by AI on what’s trending right now on X. No manual effort. Just insights.
        </p>
        <a
          href="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started for Free
        </a>
      </div>
    </div>
  );
};

export default App;
