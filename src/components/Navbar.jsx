import React, { useState, useEffect } from "react";
import { Menu, X, Zap, Github, Linkedin, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills", special: true },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll events for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Logo animation letters
  const logoText = "Vighnesh";
  const logoArray = logoText.split("");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Animated Logo with improved hover effects */}
          <motion.a
            href="#home"
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <div className="flex relative">
              {logoArray.map((letter, index) => (
                <motion.span
                  key={index}
                  className={`text-2xl font-bold ${
                    isHoveringLogo ? "text-pink-600" : "text-teal-700"
                  } transition-colors duration-300`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                  whileHover={{
                    y: [0, -3, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.span
              className={`text-2xl font-bold ml-1 ${
                isHoveringLogo ? "text-pink-600" : "text-teal-700"
              } transition-colors duration-300`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: logoArray.length * 0.05 + 0.1,
                duration: 0.5,
              }}
            >
              .dev
              <motion.span
                className="absolute -top-1 -right-3 text-yellow-400 text-xs"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ✦
              </motion.span>
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                className={`relative px-4 py-2 font-medium text-sm uppercase tracking-wider ${
                  activeSection === item.href.substring(1)
                    ? "text-teal-700"
                    : "text-gray-600 hover:text-teal-600"
                } transition-colors duration-300`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500"
                    layoutId="navUnderline"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                {item.special && (
                  <motion.span
                    className="absolute -top-1 -right-3 text-yellow-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Zap className="w-3 h-3" />
                  </motion.span>
                )}
              </motion.a>
            ))}

            {/* Social Icons */}
            <motion.div
              className="flex items-center ml-6 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://github.com/vighneshparab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vighneshparab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:vighneshparab83@gmail.com"
                className="text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white shadow-lg"
      >
        <div className="px-4 py-3 space-y-4">
          {navItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === item.href.substring(1)
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
              } transition-colors duration-200`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <div className="flex items-center">
                {item.name}
                {item.special && (
                  <Zap className="w-4 h-4 ml-2 text-yellow-400" />
                )}
              </div>
            </motion.a>
          ))}
          <motion.div
            className="pt-2 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex space-x-4 justify-center">
              <a
                href="https://github.com/vighnesh129"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vighnesh-parab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:vighnesh@example.com"
                className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-md text-sm font-medium shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
