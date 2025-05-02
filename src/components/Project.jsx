import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { FaCode, FaServer, FaMobileAlt } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Farming Recommendation Platform",
      description:
        "AI-powered platform offering crop recommendations based on location, weather, and soil data. Helping farmers optimize yields with data-driven insights.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      link: "https://github.com/vighnesh129/farming-recommendation",
      liveLink: "#",
      tags: ["AI", "React", "Node.js"],
      type: "fullstack",
    },
    {
      title: "Hostel Harmony System",
      description:
        "Comprehensive hostel management system that streamlines room allocation, fee management, and student communication with real-time updates.",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      link: "https://github.com/vighnesh129/hostel-harmony-system",
      liveLink: "#",
      tags: ["MERN", "Redux", "JWT"],
      type: "fullstack",
    },
    {
      title: "Smart Office System",
      description:
        "Modern office management platform integrating meeting scheduling, complaint handling, visitor logs, and resource management with IoT capabilities.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      link: "https://github.com/vighnesh129/smart-office-system",
      liveLink: "#",
      tags: ["IoT", "Next.js", "Firebase"],
      type: "fullstack",
    },
    {
      title: "TravelPlanner",
      description:
        "Interactive travel planning app that helps users create detailed itineraries, track bookings, and discover local attractions with personalized recommendations.",
      image:
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      link: "https://github.com/vighnesh129/travel-planner",
      liveLink: "#",
      tags: ["React Native", "Maps API", "MongoDB"],
      type: "mobile",
    },
  ];

  const projectTypeIcons = {
    fullstack: <FaCode className="text-lg" />,
    backend: <FaServer className="text-lg" />,
    mobile: <FaMobileAlt className="text-lg" />,
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white"
      id="projects"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-teal-200 mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-20 w-72 h-72 rounded-full bg-indigo-200 mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-teal-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent works. Each project was built with
            passion and attention to detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-teal-400">
                        {projectTypeIcons[project.type]}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {project.type.charAt(0).toUpperCase() +
                          project.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                      aria-label="GitHub repository"
                    >
                      <FiGithub className="mr-1" />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.liveLink !== "#" && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                        aria-label="Live project"
                      >
                        <FiExternalLink className="mr-1" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    Project #{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/vighnesh129?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-300 shadow-lg hover:shadow-teal-500/30"
          >
            View All Projects
            <FiExternalLink className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
