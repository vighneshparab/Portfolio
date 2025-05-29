import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
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

export default function About() {
  const skills = useMemo(
    () => [
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
        color: "text-yellow-500",
      },
      {
        name: "Version Control",
        icon: <FaGithub className="text-xl" />,
        color: "text-gray-700",
      },
      {
        name: "Cloud",
        icon: <FaAws className="text-xl" />,
        color: "text-orange-500",
      },
      {
        name: "DevOps",
        icon: <FaDocker className="text-xl" />,
        color: "text-blue-500",
      },
    ],
    []
  );

  const techStack = useMemo(
    () => [
      {
        icon: <SiTypescript className="text-2xl text-blue-600" />,
        name: "TypeScript",
      },
      {
        icon: <SiNextdotjs className="text-2xl text-black" />,
        name: "Next.js",
      },
      {
        icon: <SiTailwindcss className="text-2xl text-sky-400" />,
        name: "Tailwind CSS",
      },
      { icon: <SiReact className="text-2xl text-cyan-400" />, name: "React" },
      {
        icon: <FaNodeJs className="text-2xl text-green-600" />,
        name: "Node.js",
      },
      {
        icon: <SiMongodb className="text-2xl text-green-700" />,
        name: "MongoDB",
      },
      {
        icon: (
          <SiExpress className="text-2xl text-gray-600 dark:text-gray-300" />
        ),
        name: "Express.js",
      },
      { icon: <FaGit className="text-2xl text-orange-500" />, name: "Git" },
      { icon: <FaDocker className="text-2xl text-blue-500" />, name: "Docker" },
    ],
    []
  );

  React.useEffect(() => {
    const img = new Image();
    img.src = "https://avatars.githubusercontent.com/u/134200694?v=4";
  }, []);

  return (
    <section
      id="about"
      className="relative bg-[#FBFCFD] dark:bg-[#FBFCFD] py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Decorative elements with reduced opacity for better visibility on light background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400 mix-blend-multiply filter blur-lg animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-pink-400 mix-blend-multiply filter blur-lg animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 rounded-full bg-indigo-400 mix-blend-multiply filter blur-lg animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-8, 8, -8] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/134200694?v=4"
              alt="Vighnesh Developer"
              width={288}
              height={288}
              loading="eager"
              className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-teal-500 relative z-10"
            />
            <div className="absolute -inset-3 md:-inset-4 rounded-full bg-gradient-to-r from-teal-400 to-pink-500 opacity-20 blur-md animate-pulse"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500 mb-4"
          >
            Hey, I'm Vighnesh Parab{" "}
            <span className="inline-block animate-waving-hand">👋</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 dark:text-gray-700 text-lg leading-relaxed mb-4"
          >
            I'm a passionate{" "}
            <span className="font-semibold text-teal-600 dark:text-teal-600">
              full-stack developer
            </span>{" "}
            with expertise in modern web technologies.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-600 text-md leading-relaxed mb-8"
          >
            With a keen eye for design and a passion for clean code, I build
            solutions that are both functional and delightful to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
              What I Do
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white shadow-sm border ${skill.color} border-opacity-20`}
                >
                  {skill.icon}
                  <span className="text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
              Tech I Love
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-2 rounded-full bg-white dark:bg-white shadow-md">
                    {tech.icon}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-600">
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
