import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
     
      <section className="min-h-screen relative bg-black flex items-center justify-center text-white">
     
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          src="./hero.webm"
        />
       
        <div className="absolute inset-0 bg-black/75 z-10" />

      
        <div className="relative z-20 max-w-3xl w-full mx-4 p-8 bg-grey/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
              TrendWrite
            </span>
            !
          </h1>

          <p className="mb-8 text-lg max-w-xl mx-auto">
            Your personalized dashboard where you can explore trending topics,
            write your thoughts, and connect with the community.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {/* <button
              className="px-6 py-3 rounded-xl bg-gradient-to-t from-gray-300 to-white text-black font-semibold hover:from-blue-300 hover:to-blue-50 transition"
              onClick={() => navigate("/explore")}
            >
              Explore Trends
            </button> */}

            <button className="px-6 py-3 rounded-xl border border-white/30 hover:border-white transition">
              Write Manually
            </button>

            <button className="px-6 py-3 rounded-xl border border-green-400 text-white hover:text-green-400 transition" onClick={() => navigate("/blogs")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 00-1 1v4.586l-3.293-3.293a1 1 0 00-1.414 1.414L8.586 9H4a1 1 0 000 2h4.586l-3.293 3.293a1 1 0 001.414 1.414L10 12.414V17a1 1 0 002 0v-4.586l3.293 3.293a1 1 0 001.414-1.414L11.414 10H16a1 1 0 000-2h-4.586l3.293-3.293a1 1 0 00-1.414-1.414L10 7.586V3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Se all Blogs
            </button>

            <button className="px-6 py-3 rounded-xl border border-red-500 text-white hover:text-red-400 transition">
              Logout
            </button>
          </div>
        </div>
      </section>  
    </>
  );
}
