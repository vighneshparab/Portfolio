import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Wrench,
  Cloud,
  GitBranch,
  Smartphone,
  Grid,
} from "lucide-react";

// Skills data organized by category
const skillsData = {
  frontend: [
    { name: "HTML5", level: 95, color: "bg-orange-500", icon: "Code" },
    { name: "CSS3", level: 90, color: "bg-blue-500", icon: "Code" },
    { name: "JavaScript", level: 88, color: "bg-yellow-500", icon: "Code" },
    { name: "TypeScript", level: 85, color: "bg-blue-600", icon: "Code" },
    { name: "React", level: 87, color: "bg-cyan-500", icon: "Code" },
    { name: "Next.js", level: 83, color: "bg-gray-800", icon: "Code" },
    { name: "Tailwind CSS", level: 92, color: "bg-teal-400", icon: "Code" },
  ],
  backend: [
    { name: "Node.js", level: 89, color: "bg-green-600", icon: "Server" },
    { name: "Express", level: 85, color: "bg-gray-400", icon: "Server" },
    { name: "Python", level: 82, color: "bg-blue-400", icon: "Server" },
    { name: "Django", level: 75, color: "bg-green-700", icon: "Server" },
  ],
  devops: [
    { name: "Docker", level: 85, color: "bg-blue-700", icon: "Cloud" },
    { name: "AWS", level: 82, color: "bg-yellow-600", icon: "Cloud" },
    { name: "CI/CD", level: 80, color: "bg-purple-500", icon: "GitBranch" },
  ],
  database: [
    { name: "MongoDB", level: 83, color: "bg-green-500", icon: "Database" },
    { name: "MySql", level: 80, color: "bg-green-500", icon: "Database" },
    { name: "Firebase", level: 78, color: "bg-yellow-500", icon: "Database" },
  ],
  tools: [
    { name: "Git", level: 92, color: "bg-orange-600", icon: "GitBranch" },
    { name: "Postman", level: 85, color: "bg-pink-400", icon: "Wrench" },
    { name: "VS Code", level: 95, color: "bg-blue-600", icon: "Code" },
  ],
};

const categories = [
  { label: "All", value: "all", icon: "Code" },
  { label: "Frontend", value: "frontend", icon: "Code" },
  { label: "Backend", value: "backend", icon: "Server" },
  { label: "DevOps", value: "devops", icon: "Cloud" },
  { label: "Database", value: "database", icon: "Database" },
  { label: "Tools", value: "tools", icon: "Wrench" },
];

const iconComponents = {
  Code,
  Server,
  Database,
  Wrench,
  Cloud,
  GitBranch,
  Smartphone,
};

const SkillCard = memo(({ skill, isCompact = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const IconComponent = iconComponents[skill.icon] || Code;
  const colorClass = skill.color.replace("bg-", "bg-opacity-20 text-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all ${
        isCompact ? "w-40" : "w-full max-w-[180px]"
      }`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
    >
      <div className="flex items-center mb-2">
        <div className={`p-1.5 rounded-lg ${colorClass} mr-2`}>
          <IconComponent size={16} />
        </div>
        <h4
          className={`font-semibold text-gray-800 dark:text-white ${
            isCompact ? "text-sm" : "text-base"
          }`}
        >
          {skill.name}
        </h4>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-1 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.3 }}
          className={`h-full rounded-full ${skill.color}`}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
        {!isCompact && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {skill.level >= 85
              ? "Expert"
              : skill.level >= 70
              ? "Advanced"
              : "Intermediate"}
          </span>
        )}
      </div>
    </motion.div>
  );
});

const CategorySelector = memo(({ activeCategory, setActiveCategory }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="flex flex-wrap justify-center gap-2 mb-6 px-2"
      role="tablist"
    >
      {categories.map((category) => (
        <motion.button
          key={category.value}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => setActiveCategory(category.value)}
          className={`px-3 py-1.5 rounded-full transition-all text-xs sm:text-sm font-medium ${
            activeCategory === category.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          role="tab"
          aria-selected={activeCategory === category.value}
        >
          <div className="flex items-center gap-1.5">
            {React.createElement(iconComponents[category.icon], { size: 14 })}
            {category.label}
          </div>
        </motion.button>
      ))}
    </div>
  );
});

const SkillsGrid = memo(({ skills }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-2">
      <AnimatePresence>
        {skills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              delay: index * 0.05,
            }}
            className="flex justify-center"
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const prefersReducedMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return Object.values(skillsData).flat();
    return skillsData[activeCategory] || [];
  }, [activeCategory]);

  return (
    <section
      className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              Skills
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Technologies I work with and my proficiency level in each
          </p>
        </motion.div>

        <CategorySelector
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <SkillsGrid skills={filteredSkills} />
      </div>
    </section>
  );
};

export default memo(Skills);
