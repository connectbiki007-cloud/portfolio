import Section from "../components/Section";
import { motion } from "framer-motion";
import { Card, Button } from "../components/ui";

const projects = [
  {
    title: "Project One",
    desc: "A cool app built with React and Tailwind",
    link: "#", // Replace with actual URL
  },
  {
    title: "Project Two",
    desc: "Aweome Portfolio project using Framer Motion",
    link: "#", // Replace with actual URL
  },
  {
    title: "Project Three",
    desc: "E‑commerce site with modern UI",
    link: "https://om-mobile-inventory-frontend-quv3qcjep.vercel.app/", // Replace with actual URL
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  return (
    <Section id="projects" title="My Projects" className="bg-gray-900">
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            whileHover={{
              rotateY: 10,
              rotateX: 5,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            style={{ perspective: 1200 }}
            className="group"
          >
            <Card className="h-full flex flex-col bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <h3 className="text-xl font-semibold mb-2 text-cyan-400 transition-all duration-300 hover:scale-105 hover:text-cyan-300">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 flex-1 transition-colors duration-300 hover:text-gray-200">
                {project.desc}
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(project.link, "_blank", "noopener,noreferrer")
                }
                className="bg-gray-700 text-white hover:bg-cyan-600 transition-colors"
              >
                View Project
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
