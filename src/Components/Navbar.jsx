import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
   <div
  className="fixed top-2 left-1/2 flex flex-col items-center justify-center z-50 transition-all duration-300"
  style={{
    maxWidth: "1000px",
    width: scrolled ? "90%" : "100%",
    transform: "translateX(-50%)",
    backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
    boxShadow: scrolled
      ? `rgba(34, 42, 53, 0.06) 0px 0px 24px,
         rgba(0, 0, 0, 0.05) 0px 1px 1px,
         rgba(34, 42, 53, 0.04) 0px 0px 0px 1px,
         rgba(34, 42, 53, 0.08) 0px 0px 4px,
         rgba(47, 48, 55, 0.05) 0px 16px 68px,
         rgba(255, 255, 255, 0.1) 0px 1px 0px inset`
      : "none",
    borderRadius: "2rem",
    paddingLeft: scrolled ? "12px" : "0px",
    paddingRight: scrolled ? "12px" : "0px",
    backgroundColor: scrolled ? "rgba(30, 30, 30, 0.5)" : "transparent",
boxShadow: scrolled
  ? `rgba(34, 42, 53, 0.06) 0px 0px 24px,
     rgba(0, 0, 0, 0.05) 0px 1px 1px,
     rgba(34, 42, 53, 0.04) 0px 0px 0px 1px,
     rgba(34, 42, 53, 0.08) 0px 0px 4px,
     rgba(47, 48, 55, 0.05) 0px 16px 68px,
     rgba(255, 255, 255, 0.1) 0px 1px 0px inset,
     0 0 10px 3px rgba(255, 244, 229, 0.3)`
  : "none",


  }}
>

      <div className="flex flex-row justify-between items-center w-full max-w-5xl px-4 py-2 font-bold">
        <a
          href="/"
          className="font-normal flex space-x-1 items-center text-base mr-4 text-black relative z-20"
        >
          <img
            src="/logos/cluely.webp"
            alt="Logo"
            className="size-[39px] w-auto"
          />
        </a>

        <div className="hidden lg:flex flex-row items-center justify-center space-x-2 text-[14.5px] font-semibold">
          {[
            { href: "/#features", label: "Use Cases" },
            { href: "/#pricing", label: "Pricing" },
            { href: "/manifesto", label: "Manifesto" },
            { href: "/careers", label: "Careers" },
            { href: "https://support.cluely.com", label: "Help Center" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-neutral-300 hover:bg-zinc-200/40 dark:hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 z-[50]">
          <a
            href="/login"
            className="hidden md:block rounded-lg border border-transparent text-[15px] font-semibold text-zinc-950 dark:text-white hover:bg-zinc-200/40 dark:hover:bg-white/10 transition-colors px-4 py-2"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="inline-flex justify-center items-center text-base font-bold p-1 bg-white/10 rounded-2xl"
          >
            <div className="px-3 py-[4px] bg-gradient-to-t from-gray-300 to-white hover:from-blue-300 hover:to-blue-50 rounded-xl text-black hover:text-blue-900 inline-flex justify-center items-center gap-2.5 transition-colors duration-150">
              Sign Up
            </div>
          </a>
        </div>

        <button className="lg:hidden size-6 fill-white">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
