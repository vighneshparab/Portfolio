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
  Move,
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
    { name: "GraphQL", level: 78, color: "bg-pink-600", icon: "Code" },
  ],
  backend: [
    { name: "Node.js", level: 89, color: "bg-green-600", icon: "Server" },
    { name: "Express", level: 85, color: "bg-gray-400", icon: "Server" },
    { name: "Python", level: 82, color: "bg-blue-400", icon: "Server" },
    { name: "Django", level: 75, color: "bg-green-700", icon: "Server" },
    { name: "Go", level: 70, color: "bg-cyan-600", icon: "Server" },
    { name: "Rust", level: 65, color: "bg-orange-600", icon: "Server" },
  ],
  devops: [
    { name: "Docker", level: 85, color: "bg-blue-700", icon: "Cloud" },
    { name: "Kubernetes", level: 78, color: "bg-blue-600", icon: "Cloud" },
    { name: "AWS", level: 82, color: "bg-yellow-600", icon: "Cloud" },
    { name: "CI/CD", level: 80, color: "bg-purple-500", icon: "GitBranch" },
    { name: "Terraform", level: 75, color: "bg-purple-600", icon: "Cloud" },
  ],
  mobile: [
    {
      name: "React Native",
      level: 80,
      color: "bg-cyan-400",
      icon: "Smartphone",
    },
    { name: "Flutter", level: 72, color: "bg-blue-500", icon: "Smartphone" },
    { name: "Swift", level: 65, color: "bg-orange-500", icon: "Smartphone" },
  ],
  database: [
    { name: "PostgreSQL", level: 85, color: "bg-blue-400", icon: "Database" },
    { name: "MongoDB", level: 83, color: "bg-green-500", icon: "Database" },
    { name: "Redis", level: 80, color: "bg-red-600", icon: "Database" },
    { name: "Firebase", level: 78, color: "bg-yellow-500", icon: "Database" },
  ],
  tools: [
    { name: "Git", level: 92, color: "bg-orange-600", icon: "GitBranch" },
    { name: "Figma", level: 85, color: "bg-pink-400", icon: "Wrench" },
    { name: "Jira", level: 80, color: "bg-blue-500", icon: "Wrench" },
    { name: "VS Code", level: 95, color: "bg-blue-600", icon: "Code" },
  ],
};

const categories = [
  { label: "All Skills", value: "all", icon: "Code" },
  { label: "Frontend", value: "frontend", icon: "Code" },
  { label: "Backend", value: "backend", icon: "Server" },
  { label: "DevOps", value: "devops", icon: "Cloud" },
  { label: "Mobile", value: "mobile", icon: "Smartphone" },
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
      className={`relative bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all ${
        isCompact ? "w-48" : "w-56"
      }`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${colorClass} mr-3`}>
          <IconComponent size={18} />
        </div>
        <h4
          className={`font-semibold text-gray-800 dark:text-white ${
            isCompact ? "text-base" : "text-lg"
          }`}
        >
          {skill.name}
        </h4>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
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
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
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

const InfiniteMarquee = memo(
  ({ skills, direction = "left", speed = "normal" }) => {
    const prefersReducedMotion = useReducedMotion();
    const duration = useMemo(
      () =>
        ({
          slow: 60,
          normal: 40,
          fast: 20,
        }[speed] || 40),
      [speed]
    );

    if (prefersReducedMotion) {
      return (
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <SkillCard
              key={`${skill.name}-${i}`}
              skill={skill}
              isCompact={speed === "fast"}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="overflow-hidden relative py-2">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: `${
              direction === "left" ? "marqueeLeft" : "marqueeRight"
            } ${duration}s linear infinite`,
          }}
        >
          {[...skills, ...skills].map((skill, i) => (
            <div key={`${skill.name}-${i}`} className="flex-shrink-0">
              <SkillCard skill={skill} isCompact={speed === "fast"} />
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marqueeLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @keyframes marqueeRight {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    );
  }
);

const CategorySelector = memo(({ activeCategory, setActiveCategory }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => setActiveCategory(category.value)}
          className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
            activeCategory === category.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          role="tab"
          aria-selected={activeCategory === category.value}
        >
          <div className="flex items-center gap-2">
            {React.createElement(iconComponents[category.icon], { size: 16 })}
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
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

const ViewModeSelector = memo(({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-center mb-6 gap-4">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
            viewMode === "grid"
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Grid size={16} />
          Grid
        </button>
        <button
          onClick={() => setViewMode("marquee")}
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
            viewMode === "marquee"
              ? "bg-blue-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Move size={16} />
          Marquee
        </button>
      </div>
    </div>
  );
});

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const prefersReducedMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return Object.values(skillsData).flat();
    return skillsData[activeCategory] || [];
  }, [activeCategory]);

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
              Skills
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Technologies I work with and my proficiency level in each
          </p>
        </motion.div>

        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        <CategorySelector
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {viewMode === "grid" ? (
          <SkillsGrid skills={filteredSkills} />
        ) : (
          <div className="space-y-8">
            <InfiniteMarquee
              key={`row1-${activeCategory}`}
              skills={filteredSkills.slice(
                0,
                Math.ceil(filteredSkills.length / 3)
              )}
              speed="fast"
            />
            <InfiniteMarquee
              key={`row2-${activeCategory}`}
              skills={filteredSkills.slice(
                Math.ceil(filteredSkills.length / 3),
                Math.ceil((filteredSkills.length * 2) / 3)
              )}
              speed="normal"
              direction="right"
            />
            <InfiniteMarquee
              key={`row3-${activeCategory}`}
              skills={filteredSkills.slice(
                Math.ceil((filteredSkills.length * 2) / 3)
              )}
              speed="slow"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Skills);
