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
            <button
              className="px-6 py-3 rounded-xl bg-gradient-to-t from-gray-300 to-white text-black font-semibold hover:from-blue-300 hover:to-blue-50 transition"
              onClick={() => navigate("/explore")}
            >
              Explore Trends
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/30 hover:border-white transition">
              Write Manually
            </button>

            <button className="px-6 py-3 rounded-xl border border-green-400 text-white hover:text-green-400 transition">
              Write with Grok AI
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
