import React from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../utils/useActiveSection";
import { Home, User, Code, Briefcase, FileText } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "resume", label: "Resume", icon: FileText },
];

const Navbar = () => {
  const activeSection = useActiveSection();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold text-cyan-400 transition-all duration-300 hover:text-cyan-300 cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          <span className="text-gray-800 dark:text-gray-200">My</span>
          Portfolio
        </motion.h1>

        {/* Navigation Items */}
        <ul className="flex space-x-2 md:space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg
                    transition-all duration-300
                    ${
                      isActive
                        ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                        : "text-gray-600 dark:text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5"
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline text-sm font-medium">
                    {item.label}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
