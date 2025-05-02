import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Code, Server, Database, Wrench } from "lucide-react";

// Move this outside the component to prevent recreation on each render
const iconComponents = {
  Code,
  Server,
  Database,
  Wrench,
};

// Move skills data outside of component and remove useMemo since it's now static
const skillsData = {
  frontend: [
    { name: "HTML", level: 90, color: "bg-teal-500", icon: "Code" },
    { name: "CSS", level: 85, color: "bg-blue-500", icon: "Code" },
    { name: "JavaScript", level: 80, color: "bg-yellow-500", icon: "Code" },
    { name: "React", level: 75, color: "bg-cyan-500", icon: "Code" },
    { name: "Vue.js", level: 70, color: "bg-green-500", icon: "Code" },
    { name: "Next.js", level: 70, color: "bg-indigo-500", icon: "Code" },
  ],
  backend: [
    { name: "Node.js", level: 85, color: "bg-green-500", icon: "Server" },
    { name: "Express.js", level: 80, color: "bg-blue-600", icon: "Server" },
    { name: "PHP", level: 70, color: "bg-pink-500", icon: "Server" },
    { name: "Java", level: 60, color: "bg-purple-600", icon: "Server" },
  ],
  database: [
    { name: "MongoDB", level: 80, color: "bg-lime-500", icon: "Database" },
    { name: "MySQL", level: 70, color: "bg-blue-400", icon: "Database" },
    { name: "PostgreSQL", level: 65, color: "bg-red-500", icon: "Database" },
    { name: "Redis", level: 60, color: "bg-teal-500", icon: "Database" },
  ],
  tools: [
    { name: "Git", level: 90, color: "bg-gray-500", icon: "Wrench" },
    { name: "Docker", level: 85, color: "bg-blue-700", icon: "Wrench" },
    { name: "Figma", level: 70, color: "bg-pink-400", icon: "Wrench" },
    { name: "Jira", level: 60, color: "bg-teal-400", icon: "Wrench" },
  ],
};

// Pre-calculate level labels to avoid recalculating them on each render
const getLevelLabel = (level) => {
  if (level >= 80) return "Expert";
  if (level >= 70) return "Advanced";
  return "Intermediate";
};

// Speed values as constants to avoid recalculation
const SPEEDS = {
  slow: 20,
  normal: 40,
  fast: 60,
};

// Pure component with React.memo for SkillCard to prevent unnecessary re-renders
const SkillCard = React.memo(({ skill, isCompact = false }) => {
  const IconComponent = iconComponents[skill.icon];
  const colorClass = skill.color.replace("bg-", "bg-opacity-20 text-");
  const levelLabel = getLevelLabel(skill.level);

  return (
    <div
      className={`bg-white rounded-lg p-4 border border-gray-100 transition-transform hover:scale-105 ${
        isCompact ? "w-48" : "w-56"
      }`}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-full ${colorClass} mr-3`}>
          <IconComponent size={18} />
        </div>
        <h4
          className={`font-semibold text-gray-800 ${
            isCompact ? "text-base" : "text-lg"
          }`}
        >
          {skill.name}
        </h4>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full mb-2">
        <div
          className={`h-full rounded-full ${skill.color}`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{skill.level}%</span>
        {!isCompact && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
            {levelLabel}
          </span>
        )}
      </div>
    </div>
  );
});

// Insert CSS once at component mount instead of on every render
const useMarqueeStyles = () => {
  useEffect(() => {
    // Check if the style is already added to avoid duplicates
    if (!document.getElementById("marquee-style")) {
      const style = document.createElement("style");
      style.id = "marquee-style";
      style.innerHTML = `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      const existingStyle = document.getElementById("marquee-style");
      if (
        existingStyle &&
        document.querySelectorAll(".animate-marquee").length === 0
      ) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);
};

const InfiniteMarquee = React.memo(
  ({ skills, direction = "left", speed = "normal", pauseOnHover = true }) => {
    const containerRef = useRef(null);
    const innerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const speedValue = SPEEDS[speed] || SPEEDS.normal;

    // Add marquee styles only once
    useMarqueeStyles();

    // Optimize animation setup with useLayoutEffect for smoother performance
    useEffect(() => {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (!container || !inner) return;

      // Create a single clone of all items to reduce DOM manipulation
      if (inner.children.length <= skills.length) {
        const fragment = document.createDocumentFragment();
        Array.from(inner.children).forEach((item) =>
          fragment.appendChild(item.cloneNode(true))
        );
        inner.appendChild(fragment);
      }

      // Calculate animation duration based on content width
      const totalContentWidth = inner.scrollWidth / 2;
      const animationDuration = totalContentWidth / speedValue;

      // Apply animation properties
      inner.style.animationDuration = `${animationDuration}s`;
      inner.style.animationDirection =
        direction === "left" ? "normal" : "reverse";
      inner.style.animationPlayState = isPaused ? "paused" : "running";
    }, [skills.length, direction, speedValue, isPaused]);

    // Event handlers with useCallback to prevent recreation on each render
    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    return (
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={innerRef} className="flex gap-4 animate-marquee">
          {skills.map((skill, i) => (
            <div key={`${skill.name}-${i}`} className="skill-item">
              <SkillCard skill={skill} isCompact={speed === "fast"} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

// Main component with optimized filtering logic
const Skill = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Memoize filtered skills to prevent recalculation on every render
  const filteredSkills = useMemo(() => {
    const allSkills = {
      row1: [...skillsData.frontend, ...skillsData.backend].slice(0, 8),
      row2: [...skillsData.database, ...skillsData.tools].slice(0, 8),
      row3: Object.values(skillsData).flat().slice(0, 8),
    };

    if (activeCategory === "all") return allSkills;

    const categorySkills = skillsData[activeCategory];
    const chunk = Math.ceil(categorySkills.length / 3);

    return {
      row1: categorySkills.slice(0, chunk),
      row2: categorySkills.slice(chunk, 2 * chunk),
      row3: categorySkills.slice(2 * chunk),
    };
  }, [activeCategory]);

  // Pre-define categories array to prevent recreation on each render
  const categories = [
    { label: "All Skills", value: "all", color: "bg-blue-600" },
    { label: "Frontend", value: "frontend", color: "bg-teal-500" },
    { label: "Backend", value: "backend", color: "bg-green-500" },
    { label: "Database", value: "database", color: "bg-red-500" },
    { label: "Tools", value: "tools", color: "bg-yellow-500" },
  ];

  // Handler with useCallback
  const handleCategoryChange = useCallback((value) => {
    setActiveCategory(value);
  }, []);

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">My Skills</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's a showcase of my technical expertise and proficiency in
            various technologies.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => handleCategoryChange(value)}
              className={`px-5 py-2 rounded-full transition-all ${
                activeCategory === value
                  ? `${color} text-white`
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Infinite Marquee Rows with key props to help React identify changes */}
        <div className="space-y-8">
          <InfiniteMarquee
            key={`row1-${activeCategory}`}
            skills={filteredSkills.row1}
            speed="fast"
          />
          <InfiniteMarquee
            key={`row2-${activeCategory}`}
            skills={filteredSkills.row2}
            speed="normal"
            direction="right"
          />
          <InfiniteMarquee
            key={`row3-${activeCategory}`}
            skills={filteredSkills.row3}
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skill);
