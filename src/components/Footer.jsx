import React, { useState, useEffect } from "react";
import { Heart, ArrowUp, Code, ExternalLink, Coffee } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [year] = useState(new Date().getFullYear());

  // Check if user has scrolled enough to show the back-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Wave animation for the footer top
  const wavePoints = [
    "0,128 60,96 120,128 180,160 240,128 300,64 360,0 420,32 480,64 540,96 600,128 660,96 720,64 780,32 840,0 900,32 960,64 1020,96 1080,128 1140,96 1200,128 1260,160 1320,128",
    "0,160 60,128 120,96 180,64 240,96 300,128 360,160 420,128 480,96 540,64 600,32 660,64 720,96 780,128 840,160 900,128 960,96 1020,64 1080,32 1140,64 1200,96 1260,128 1320,160",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-teal-800 text-white overflow-hidden">
      {/* Animated Wave Shape Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform translate-y-0 rotate-180">
        <svg
          className="relative block w-full h-32 transform"
          viewBox="0 0 1320 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0fdfa" />
              <stop offset="50%" stopColor="#ccfbf1" />
              <stop offset="100%" stopColor="#f0fdfa" />
            </linearGradient>
          </defs>
          <path className="wave" d={wavePoints[0]} fill="url(#waveGradient)">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values={`${wavePoints[0]}; ${wavePoints[1]}; ${wavePoints[0]}`}
            />
          </path>
        </svg>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-3 bg-teal-600 text-white rounded-full shadow-lg z-50 transition-all duration-300 ease-in-out group ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-10"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
        <span className="absolute right-full mr-2 whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back to top
        </span>
      </button>

      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & About Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <a href="#home" className="text-3xl font-bold tracking-wider">
                <span className="inline-block relative">
                  Vighnesh
                  <span className="absolute -top-1 -right-2 text-yellow-400 text-xs">
                    ✦
                  </span>
                </span>
                <span className="text-teal-300">.dev</span>
              </a>
            </div>

            <p className="text-teal-100 mb-6 leading-relaxed">
              Creating beautiful, performant web experiences that solve real
              problems. I specialize in React, UI/UX design, and building
              products that people love.
            </p>

            <div className="flex space-x-4 mb-8">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700/50 hover:bg-teal-600 hover:text-white p-3 rounded-full transition-colors duration-300 group relative"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="tooltip-text">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700/50 hover:bg-teal-600 hover:text-white p-3 rounded-full transition-colors duration-300 group relative"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="tooltip-text">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700/50 hover:bg-teal-600 hover:text-white p-3 rounded-full transition-colors duration-300 group relative"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="tooltip-text">Twitter</span>
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700/50 hover:bg-teal-600 hover:text-white p-3 rounded-full transition-colors duration-300 group relative"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="tooltip-text">Instagram</span>
              </a>
            </div>

            <div className="bg-teal-700/30 p-4 rounded-lg border border-teal-600/30">
              <p className="text-teal-200 text-sm flex items-center">
                <Coffee className="w-4 h-4 mr-2 text-yellow-400" />
                <span>Open to new opportunities and collaborations!</span>
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-6 relative inline-block group">
              Quick Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Skills", href: "#skills" },
                { name: "Contact", href: "#contact" },
                { name: "Resume", href: "/resume.pdf", external: true },
              ].map((link, idx) => (
                <li
                  key={idx}
                  className="transform hover:translate-x-2 transition-transform duration-300"
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : ""}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="text-teal-100 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.name}
                    {link.external && (
                      <ExternalLink className="w-3 h-3 ml-1 inline" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-6 relative inline-block group">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <p className="text-teal-100 mb-4 text-sm">
              Subscribe to my newsletter for the latest articles, tutorials, and
              project updates.
            </p>

            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-teal-700/30 text-white rounded-lg border border-teal-600/30 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-teal-300/70"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-teal-500 hover:bg-teal-400 text-teal-900 font-medium rounded-lg transition-colors duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-800"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 text-xs text-teal-300">
              <p>No spam, unsubscribe at any time.</p>
            </div>
          </div>
        </div>

        {/* Footer Divider with Animated Gradient */}
        <div className="relative h-px w-full my-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400 to-transparent shimmer-animation"></div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-3">
          <div className="text-teal-200 text-sm mb-4 md:mb-0">
            © {year} Vighnesh.dev. All rights reserved.
          </div>

          <div className="flex items-center text-teal-200 text-sm">
            <div className="flex items-center transform hover:scale-105 transition-transform">
              <span>Made with</span>
              <Heart className="mx-1 h-4 w-4 text-red-400 animate-pulse" />
              <span>and</span>
              <Code className="mx-1 h-4 w-4 text-teal-300" />
              <span>by Vighnesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--size": `${Math.random() * 10 + 5}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--duration": `${Math.random() * 20 + 10}s`,
              "--delay": `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .wave {
          animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          transform-origin: center bottom;
        }

        .shimmer-animation {
          animation: shimmer 3s infinite linear;
          background-size: 1000% 100%;
        }

        .tooltip-text {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #1e293b;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease;
          white-space: nowrap;
          pointer-events: none;
        }

        .group:hover .tooltip-text {
          opacity: 1;
          visibility: visible;
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: var(--y);
          left: var(--x);
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(30px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </footer>
  );
}
