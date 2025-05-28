import React, { useState, useRef, useCallback, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Check, AlertCircle } from "lucide-react";

export default function ContactSection() {
  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: "",
  });

  // Refs for form and inputs
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Memoized event handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setFormStatus({
        isSubmitting: true,
        isSubmitted: false,
        isError: false,
        message: "",
      });

      // Form validation
      if (!formState.name || !formState.email || !formState.message) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: true,
          message: "Please fill in all required fields.",
        });
        return;
      }

      // Simulate form submission (replace with actual API call)
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: "Thanks for your message! I'll get back to you soon.",
        });

        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Auto-dismiss success message
        timeoutRef.current = setTimeout(() => {
          setFormStatus((prev) => ({
            ...prev,
            isSubmitted: false,
            message: "",
          }));
        }, 5000);
      } catch (error) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          isError: true,
          message: "Something went wrong. Please try again later.",
        });
      }
    },
    [formState]
  );

  // Input focus/blur handlers
  const handleFocus = useCallback((e) => {
    e.target.parentNode.classList.add("focused");
  }, []);

  const handleBlur = useCallback((e) => {
    if (!e.target.value) {
      e.target.parentNode.classList.remove("focused");
    }
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Social media links data
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/vighneshparab",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vighnesh-parab-a210a9258",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mr_vignesh20?igsh=MTFkcXdmZTg1ZnE3bQ==",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-teal-600" />,
      title: "Location",
      content: "Virar East India",
    },
    {
      icon: <Mail className="w-6 h-6 text-teal-600" />,
      title: "Email",
      content: "vighneshparab83@gmail.com",
      href: "mailto:vighneshparab83@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-600" />,
      title: "Phone",
      content: "+91 92233 57837",
      href: "tel:+91 92233 57837",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-gradient-to-b from-white to-teal-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-teal-500 rounded-full transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to contact me
            anytime!
          </p>
        </div>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
          {/* Contact Info Card */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 rounded-full p-2.5">
                      {info.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
                        {info.title}
                      </h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-300 mt-1 inline-block"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                  Social Profiles
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-900 text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 p-2.5 rounded-full transition-colors duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Send Me a Message
              </h3>

              {/* Status Messages */}
              {(formStatus.isSubmitted || formStatus.isError) && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center animate-appear ${
                    formStatus.isSubmitted
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                  }`}
                >
                  {formStatus.isSubmitted ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  <span>{formStatus.message}</span>
                </div>
              )}

              {/* Contact Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5 md:space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {/* Name Field */}
                  <div className="form-field-wrapper">
                    <div
                      className={`relative border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-300 ${
                        formState.name ? "focused" : ""
                      }`}
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        ref={nameInputRef}
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="block w-full px-4 pt-5 pb-2 text-gray-800 dark:text-gray-200 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Your Name*
                      </label>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-field-wrapper">
                    <div
                      className={`relative border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-300 ${
                        formState.email ? "focused" : ""
                      }`}
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="block w-full px-4 pt-5 pb-2 text-gray-800 dark:text-gray-200 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Your Email*
                      </label>
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="form-field-wrapper">
                  <div
                    className={`relative border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-300 ${
                      formState.subject ? "focused" : ""
                    }`}
                  >
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="block w-full px-4 pt-5 pb-2 text-gray-800 dark:text-gray-200 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="subject"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                      Subject
                    </label>
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-field-wrapper">
                  <div
                    className={`relative border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-300 ${
                      formState.message ? "focused" : ""
                    }`}
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="block w-full px-4 pt-5 pb-2 text-gray-800 dark:text-gray-200 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                      placeholder=" "
                      required
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                    >
                      Your Message*
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 ${
                      formStatus.isSubmitting
                        ? "opacity-80 cursor-not-allowed"
                        : "hover:-translate-y-1"
                    }`}
                    aria-label="Send message"
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        .form-field-wrapper .focused {
          border-color: #0d9488; /* teal-600 */
          box-shadow: 0 0 0 1px #0d9488;
        }

        .form-field-wrapper .focused label {
          color: #0f766e; /* teal-700 */
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-appear {
          animation: appear 0.25s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
