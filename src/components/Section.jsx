import { motion } from "framer-motion";
import { Container } from "./ui";

const Section = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <Container>
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-100 transition-all duration-300 hover:scale-105 hover:text-green-900"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
