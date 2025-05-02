import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaServer,
  FaPalette,
  FaNodeJs,
  FaGit,
  FaDocker,
  FaDatabase,
  FaAws,
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

import "../assets/style/About.css";

export default function About() {
  const skills = [
    {
      name: "Frontend",
      icon: <FaPalette className="text-xl" />,
      color: "text-indigo-500",
    },
    {
      name: "Backend",
      icon: <FaServer className="text-xl" />,
      color: "text-teal-500",
    },
    {
      name: "Fullstack",
      icon: <FaCode className="text-xl" />,
      color: "text-pink-500",
    },
    {
      name: "Database",
      icon: <FaDatabase className="text-xl" />,
      color: "text-yellow-500", // You can use different colors for categories
    },
    {
      name: "Version Control",
      icon: <FaGithub className="text-xl" />,
      color: "text-gray-700", // GitHub logo with dark theme color
    },
    {
      name: "Cloud",
      icon: <FaAws className="text-xl" />,
      color: "text-orange-500", // AWS cloud color
    },
    {
      name: "DevOps",
      icon: <FaDocker className="text-xl" />,
      color: "text-blue-500", // Docker logo with blue color
    },
  ];

  const techStack = [
    {
      icon: <SiTypescript className="text-2xl text-blue-600" />,
      name: "TypeScript",
    }, // Blue
    { icon: <SiNextdotjs className="text-2xl text-black" />, name: "Next.js" }, // Black
    {
      icon: <SiTailwindcss className="text-2xl text-sky-400" />,
      name: "Tailwind CSS",
    }, // Light blue
    { icon: <SiReact className="text-2xl text-cyan-400" />, name: "React" }, // Cyan
    { icon: <FaNodeJs className="text-2xl text-green-600" />, name: "Node.js" }, // Green
    {
      icon: <SiMongodb className="text-2xl text-green-700" />,
      name: "MongoDB",
    }, // Dark green
    {
      icon: <SiExpress className="text-2xl text-gray-600" />,
      name: "Express.js",
    }, // Gray
    { icon: <FaGit className="text-2xl text-orange-500" />, name: "Git" }, // Orange
    { icon: <FaDocker className="text-2xl text-blue-500" />, name: "Docker" }, // Blue
  ];

  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-pink-400 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 rounded-full bg-indigo-400 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        {/* Image with floating animation */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/134200694?v=4"
              alt="Vighnesh Developer"
              className="w-72 h-72 rounded-full object-cover shadow-2xl border-4 border-teal-500 relative z-10"
            />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-400 to-pink-500 opacity-20 blur-lg animate-pulse"></div>
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500 mb-4"
          >
            Hey, I'm Vighnesh Parab{" "}
            <span className="animate-waving-hand">👋</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 text-lg leading-relaxed mb-4"
          >
            I'm a passionate{" "}
            <span className="font-semibold text-teal-600">
              full-stack developer
            </span>{" "}
            with expertise in modern web technologies. I specialize in creating
            performant, accessible, and visually stunning digital experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-md leading-relaxed mb-8"
          >
            With a keen eye for design and a passion for clean code, I build
            solutions that are not only functional but also delightful to use. I
            believe in continuous learning and staying updated with the latest
            industry trends.
          </motion.p>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              What I Do
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border ${skill.color} border-opacity-20`}
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Tech I Love
            </h3>
            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-3 rounded-full bg-white shadow-md">
                    {tech.icon}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
