import Section from "../components/Section";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const About = () => {
  // Update the URL Links with your profile
  const socialLinks = {
    facebook: "https://www.facebook.com/bikash.kc.400044",
    instagram: "https://www.instagram.com/i.m.biki/",
    linkedin: "https://www.linkedin.com/in/bikashkc07/",
    github: "https://github.com/connectbiki007-cloud",
  };

  return (
    <Section id="about" title="About Me" className="bg-gray-900">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.02 }} // subtle scale on hover
          whileTap={{ scale: 0.98 }} // slight press effect
          className="flex justify-center"
        >
          <img
            src={profileImg}
            alt="Bikash KC"
            className="rounded-lg shadow-xl w-64 h-64 md:w-72 md:h-72 object-cover animate-float border-4 border-cyan-400/30 transition-all duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="space-y-4"
        >
          <p className="text-lg text-gray-300 transition-colors duration-300 hover:text-gray-400">
            Completed Frontend Development training with React.js and modern
            JavaScript (ES6+). Designed and developed responsive web
            applications using React.js. Built multiple personal projects to
            strengthen frontend development skills. Implemented reusable
            components and integrated RESTful APIs. Ensured application
            performance and cross-browser compatibility.
            <br />
          </p>
          <p className="text-lg text-gray-300 transition-colors duration-300 hover:text-gray-400">
            Currently learning MERN Stack (MongoDB, Express.js, React.js,
            Node.js). Actively applying for internship opportunities to gain
            industry experience.
          </p>
          <p className="text-lg text-gray-300 transition-colors duration-300 hover:text-gray-400">
            When I'm not coding, you'll find me hiking, reading tech blogs, or
            experimenting with new CSS tricks.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-4">
            <motion.a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </motion.a>
            <motion.a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <Github size={28} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
