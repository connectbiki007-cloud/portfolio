import Section from "../components/Section";
import { motion } from "framer-motion";
import { Card } from "../components/ui";
import {
  Atom,
  FileJson,
  Palette,
  Sparkles,
  Server,
  GitBranch,
} from "lucide-react";

// Map skill names to their corresponding Lucide icons
const skillIcons = {
  React: Atom,
  JavaScript: FileJson,
  "Tailwind CSS": Palette,
  "Framer Motion": Sparkles,
  "Node.js": Server,
  Git: GitBranch,
};

const skills = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Git",
];

const Skills = () => {
  return (
    <Section id="skills" title="My Skills" className="bg-gray-950">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill, index) => {
          const IconComponent = skillIcons[skill];
          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 20 }}
              style={{ perspective: 1000 }}
            >
              <Card className="text-center py-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col items-center gap-3">
                {/* Icon with horizontal floating animation */}
                <motion.div
                  animate={{
                    x: [0, 15, 0, -15, 0], // moves right, back, left, back
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <IconComponent size={40} className="text-cyan-400" />
                </motion.div>
                <p className="font-semibold transition-colors duration-300 hover:text-cyan-300">
                  {skill}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
