import { useState, useRef, useEffect } from "react";
import {
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Separate data to improve maintainability
import { education, certifications, courses } from "./educationData";

const EducationCertifications = () => {
  const [filter, setFilter] = useState("all");
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter mechanism
  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="education-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="education-heading"
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My academic background and commitment to continuous learning in
            technology
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Column */}
          <motion.div
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl mr-4 text-white">
                <FaGraduationCap className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Education</h3>
            </div>

            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex group"
                >
                  <div className="mr-4 mt-1 text-teal-500 transition-colors group-hover:text-teal-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-full mt-1 sm:mt-0 inline-block font-medium">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mt-1">
                      {item.institution}
                    </p>
                    <p className="text-gray-500 mt-2">{item.description}</p>
                    {item.gpa && (
                      <p className="mt-2 text-sm font-medium">
                        <span className="text-gray-600">GPA:</span>{" "}
                        <span className="text-teal-600">{item.gpa}</span>
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Column */}
          <motion.div
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl mr-4 text-white">
                <FaCertificate className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm transition-all group"
                  aria-label={`${cert.title} certification from ${cert.issuer}`}
                  whileHover={{ y: -2 }}
                >
                  <div className="mr-3 mt-1 text-purple-500 transition-colors group-hover:text-purple-600">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {cert.title}
                      </h4>
                      <FaExternalLinkAlt className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors mt-1" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      {cert.issuer}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-500">{cert.year}</p>
                      {cert.credentialId && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Certification Badges */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Certification Badges
              </h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {certifications.map((cert, index) => (
                  <motion.a
                    key={index}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none rounded-lg"
                    aria-label={`${cert.title} badge`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative group">
                      <img
                        src={cert.badge}
                        alt={`${cert.title} badge`}
                        width="90"
                        height="90"
                        className="h-24 w-24 object-contain rounded-lg border border-gray-200 group-hover:border-purple-300 transition-colors"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-end p-2">
                        <span className="text-white text-xs font-medium truncate w-full text-center">
                          View Credential
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Courses Column */}
          <motion.div
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl mr-4 text-white">
                  <FaLaptopCode className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Continuous Learning
                </h3>
              </div>

              {/* Filter dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-lg px-3 py-2 bg-orange-50 hover:bg-orange-100 transition-colors"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  aria-haspopup="true"
                  aria-expanded={showFilterDropdown}
                >
                  <FaFilter className="mr-2" />
                  <span className="mr-2">
                    {filter === "all"
                      ? "All"
                      : filter === "frontend"
                      ? "Frontend"
                      : "Data Science"}
                  </span>
                  {showFilterDropdown ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {showFilterDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 border border-gray-200"
                      onClick={() => setShowFilterDropdown(false)}
                    >
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => setFilter("all")}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              filter === "all"
                                ? "bg-orange-50 text-orange-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            All Courses
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setFilter("frontend")}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              filter === "frontend"
                                ? "bg-orange-50 text-orange-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            Frontend Development
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setFilter("data")}
                            className={`block px-4 py-2 text-sm w-full text-left ${
                              filter === "data"
                                ? "bg-orange-50 text-orange-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            Data Science
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="mr-3 mt-1 text-orange-500">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {course.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                        <p className="text-sm text-gray-600 font-medium">
                          {course.platform}
                        </p>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                            {course.hours} hours
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {course.year}
                          </span>
                        </div>
                      </div>
                      {course.completion && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 text-right">
                            {course.completion}% completed
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8 text-gray-500 rounded-xl bg-gray-50"
                >
                  No courses match the selected filter
                </motion.div>
              )}
            </div>

            {/* Progress Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Learning Progress
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">
                      Total Hours Completed
                    </span>
                    <span className="font-semibold">120+ hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">
                      Certificates Earned
                    </span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">
                      Current Learning Streak
                    </span>
                    <span className="font-semibold">24 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
