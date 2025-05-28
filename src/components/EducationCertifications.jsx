import { useState, useRef, useEffect } from "react";
import {
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaFilter,
} from "react-icons/fa";

// Separate data to improve maintainability
import { education, certifications, courses } from "./educationData";

const EducationCertifications = () => {
  const [filter, setFilter] = useState("all");
  const [isIntersecting, setIsIntersecting] = useState(false);
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

  // Badge lazy loading handler
  const loadBadgeImage = (event) => {
    event.target.classList.remove("opacity-0");
    event.target.classList.add("opacity-100");
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="education-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-8 md:mb-12 transition-all duration-700 transform ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="education-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
          >
            Education & Certifications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My formal education and continuous learning journey in technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Education Column */}
          <div
            className={`bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-700 delay-100 transform ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="p-2 bg-teal-100 rounded-lg mr-4">
                <FaGraduationCap className="text-2xl text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((item, index) => (
                <div
                  key={index}
                  className={`flex group transition-all duration-700 delay-${
                    100 + index * 100
                  } ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="mr-4 mt-1 text-teal-500 transition-colors group-hover:text-teal-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <h4 className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded-full mt-1 sm:mt-0 inline-block">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mt-1">
                      {item.institution}
                    </p>
                    <p className="text-gray-500 mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div
            className={`bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-700 delay-200 transform ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <FaCertificate className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-sm transition-all group ${
                    isIntersecting
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                  aria-label={`${cert.title} certification from ${cert.issuer}`}
                >
                  <div className="mr-3 mt-1 text-purple-500 transition-colors group-hover:text-purple-600">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {cert.title}
                      </h4>
                      <FaExternalLinkAlt className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                    <p className="text-xs text-gray-400 mt-1">{cert.year}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Certification Badges */}
            <div
              className={`mt-6 pt-6 border-t border-gray-100 transition-all duration-700 delay-300 ${
                isIntersecting ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="text-md font-medium text-gray-800 mb-4">
                Certification Badges
              </h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {certifications.map((cert, index) => (
                  <a
                    key={index}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none rounded-lg"
                    aria-label={`${cert.title} badge`}
                  >
                    {/* Image loading optimization */}
                    <img
                      src={cert.badge}
                      alt={`${cert.title} badge`}
                      width="80"
                      height="80"
                      className="h-20 w-20 object-contain opacity-0 transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onLoad={loadBadgeImage}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Column */}
          <div
            className={`bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-700 delay-300 transform ${
              isIntersecting
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-4">
                  <FaLaptopCode className="text-2xl text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Continuous Learning
                </h3>
              </div>

              {/* Filter dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-lg px-2 py-1"
                  onClick={() =>
                    document
                      .getElementById("filter-dropdown")
                      .classList.toggle("hidden")
                  }
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FaFilter className="mr-1" />
                  <span>Filter</span>
                </button>
                <div
                  id="filter-dropdown"
                  className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg hidden z-10 border border-gray-100"
                >
                  <ul className="py-1" role="menu" aria-orientation="vertical">
                    <li>
                      <button
                        onClick={() => setFilter("all")}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === "all"
                            ? "bg-orange-50 text-orange-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        role="menuitem"
                      >
                        All Courses
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilter("frontend")}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === "frontend"
                            ? "bg-orange-50 text-orange-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        role="menuitem"
                      >
                        Frontend
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilter("data")}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === "data"
                            ? "bg-orange-50 text-orange-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        role="menuitem"
                      >
                        Data Science
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-3 rounded-lg border border-gray-200 hover:border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all group ${
                      isIntersecting
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="mr-3 mt-1 text-orange-500">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {course.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                        <p className="text-sm text-gray-500">
                          {course.platform}
                        </p>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {course.hours} hours
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            {course.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No courses match the selected filter
                </div>
              )}
            </div>

            {/* Progress Stats */}
            <div
              className={`mt-6 pt-6 border-t border-gray-100 transition-all duration-700 delay-400 ${
                isIntersecting ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="text-md font-medium text-gray-800 mb-3">
                Learning Progress
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Hours</span>
                    <span className="font-medium">120+ hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Certificates Earned</span>
                    <span className="font-medium">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
