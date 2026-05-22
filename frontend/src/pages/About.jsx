import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About <span className="text-primary">Me</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              I am a passionate Full-Stack Developer with a strong foundation in modern web technologies. 
              My journey in web development started with a curiosity to understand how things work on the internet, 
              which quickly evolved into a dedicated pursuit of building elegant, scalable, and user-centric applications.
            </p>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and enjoy tackling complex problems, 
              whether it's designing an intuitive user interface or architecting a robust backend REST API.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              When I'm not coding, I'm usually exploring new tech trends, contributing to open-source, or refining my skills 
              in UI/UX design to bridge the gap between engineering and aesthetics.
            </p>
          </div>
          
          <div className="bg-surface p-8 rounded-2xl border border-border-custom">
            <h3 className="text-2xl font-bold mb-6">Tech Stack</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux', 'HTML/CSS'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-background rounded-full text-sm font-medium border border-border-custom">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-background rounded-full text-sm font-medium border border-border-custom">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Database & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['MongoDB', 'Mongoose', 'Git', 'GitHub', 'Vite', 'Postman'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-background rounded-full text-sm font-medium border border-border-custom">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
