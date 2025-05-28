import {
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaLaptopCode,
  FaReact,
  FaDatabase,
  FaCloud,
  FaBrain,
} from "react-icons/fa";

// Education data
export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    year: "2018 - 2022",
    description:
      "Specialized in Software Engineering with minor in Data Science",
    icon: <FaGraduationCap className="text-2xl" />,
    achievements: [
      "Dean's List all semesters",
      "Led team project that won Hackathon 2021",
    ],
  },
  {
    degree: "High School Diploma",
    institution: "Tech Magnet High School",
    year: "2014 - 2018",
    description: "Focus on STEM curriculum with advanced programming courses",
    icon: <FaBook className="text-2xl" />,
    achievements: ["Valedictorian", "President of Coding Club"],
  },
];

// Certifications data
export const certifications = [
  {
    title: "Diploma In Software Engineering",
    issuer: "RS Infotech",
    year: "2022",
    badge: "",
    credentialUrl: "https://www.credly.com/badges/12345",
    icon: <FaCloud className="text-2xl" />,
    skills: ["Cloud Architecture", "AWS Services", "Security"],
  },
];

// Courses data
export const courses = [
  {
    title: "Advanced React and Redux",
    platform: "Self",
    year: "2023",
    hours: "24",
    icon: <FaReact className="text-2xl" />,
    category: "frontend",
    completed: true,
    certificate: true,
  },
  {
    title: "Machine Learning Specialization",
    platform: "Youtube",
    year: "2024",
    hours: "60",
    icon: <FaBrain className="text-2xl" />,
    category: "data",
    completed: true,
    certificate: true,
  },
  {
    title: "Full-Stack Web Development",
    platform: "RS INFOTECH",
    year: "2022",
    hours: "100",
    icon: <FaLaptopCode className="text-2xl" />,
    category: "frontend",
    completed: true,
    certificate: true,
  },
  {
    title: "Data Science and Analytics",
    platform: "Self",
    year: "2023",
    hours: "30",
    icon: <FaDatabase className="text-2xl" />,
    category: "data",
    completed: false,
    certificate: false,
    progress: 75,
  },
];
