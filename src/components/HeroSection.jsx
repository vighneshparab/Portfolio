import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaCode, FaLaptopCode } from "react-icons/fa";

// Memoized floating code icon component
const FloatingIcon = memo(({ icon: Icon, position, animationProps }) => (
  <motion.div
    className={`absolute ${position} text-gray-300`}
    animate={animationProps.animate}
    transition={animationProps.transition}
  >
    <Icon />
  </motion.div>
));

// Memoized background blob component
const BackgroundBlob = memo(({ className, style }) => (
  <div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob ${className}`}
    style={style}
  ></div>
));

// Memoized TypeWriter effect component
const TypeWriter = memo(({ phrases }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  // Typing and deleting effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 60;
    const delay = isDeleting ? 500 : 1500;

    let timer;

    if (!isDeleting && displayText === phrases[currentIndex]) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((currentIndex + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        const fullText = phrases[currentIndex];
        setDisplayText(
          isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, phrases]);

  return (
    <span className="inline-block min-w-[300px]">
      {displayText}
      <span
        className={`inline-block w-1 h-8 align-middle ml-1 ${
          cursorBlink ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "#0d9488" }}
      ></span>
    </span>
  );
});

// Memoized button component
const ActionButton = memo(({ primary, href, target, rel, children }) => {
  const baseClasses =
    "relative px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden";
  const primaryClasses =
    "bg-gradient-to-r from-teal-500 to-blue-600 text-white";
  const secondaryClasses = "border-2 border-teal-500 text-teal-600";

  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target={target}
      rel={rel}
      className={`${baseClasses} ${
        primary ? primaryClasses : secondaryClasses
      }`}
    >
      {children}
    </motion.a>
  );
});

// Main component
export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const phrases = [
    "Web Developer 💻",
    "MERN Stack Developer 🚀",
    "Creative Problem Solver 🧠",
    "Tech Explorer 🔍",
    "UI/UX Enthusiast 🎨",
    "Full-Stack Innovator 🧑‍💻",
    "Code Craftsman 🛠️",
    "Lifelong Learner 📚",
    "API Integrator ⚙️",
    "Open Source Contributor 🌐",
  ];

  // Handle mouse movement for parallax effect - with debounce
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.3, duration: 0.8 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.9, duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 pt-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundBlob
          className="top-20 left-20 w-64 h-64 bg-teal-100"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${
              mousePosition.y * 20
            }px)`,
          }}
        />
        <BackgroundBlob
          className="bottom-20 right-20 w-72 h-72 bg-blue-100 animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${
              mousePosition.y * 30
            }px)`,
          }}
        />
        <BackgroundBlob
          className="top-1/3 right-1/4 w-60 h-60 bg-purple-100 animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${
              mousePosition.y * 25
            }px)`,
          }}
        />
      </div>

      {/* Floating code icons */}
      <FloatingIcon
        icon={FaCode}
        position="top-1/4 left-1/5 text-4xl"
        animationProps={{
          animate: { y: [0, -15, 0] },
          transition: { duration: 5, repeat: Infinity },
        }}
      />
      <FloatingIcon
        icon={FaLaptopCode}
        position="bottom-1/3 right-1/4 text-5xl"
        animationProps={{
          animate: { y: [0, 15, 0] },
          transition: { duration: 6, repeat: Infinity, delay: 1 },
        }}
      />

      <div className="text-center max-w-4xl relative z-10">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-4"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
            Vighnesh Parab
          </span>
        </motion.h1>

        <motion.h2
          variants={fadeInVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl mt-6 text-gray-600 h-12 font-medium flex justify-center items-center"
        >
          <TypeWriter phrases={phrases} />
        </motion.h2>

        <motion.p
          variants={fadeInVariants}
          custom={2}
          initial="hidden"
          animate="visible"
          className="mt-8 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          I craft{" "}
          <span className="font-medium text-teal-600">
            exceptional digital experiences
          </span>{" "}
          with clean, efficient code and thoughtful design principles.
          Passionate about building solutions that make an impact.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <ActionButton primary href="#projects">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View My Work</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </ActionButton>

          <ActionButton
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FiDownload className="text-lg" />
              <span>Download CV</span>
            </span>
            <span className="absolute inset-0 bg-teal-500 w-0 group-hover:w-full transition-all duration-300 -z-1"></span>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <FiDownload className="mr-2" />
              Download CV
            </span>
          </ActionButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInVariants}
          custom={5}
          initial="hidden"
          animate="visible"
          className="mt-16 animate-bounce"
        >
          <a
            href="#about"
            className="text-gray-400 hover:text-teal-600 transition-colors inline-flex flex-col items-center"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
