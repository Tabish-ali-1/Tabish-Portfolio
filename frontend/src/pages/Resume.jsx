import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Award, ShieldCheck, GraduationCap } from 'lucide-react';

const Resume = () => {
  const certifications = [
    {
      title: "Frontend Certificate",
      issuer: "Aptech Computer Education",
      image: "/Frontendcertificate.png",
      description: "Comprehensive training in responsive web design, HTML5, CSS3, JavaScript, and modern frontend frameworks.",
      color: "from-blue-500/20 via-indigo-500/10 to-transparent",
      borderColor: "hover:border-blue-500/50"
    },
    {
      title: "Fullstack Certificate",
      issuer: "Aptech Computer Education",
      image: "/Fullstack cirtificate.png",
      description: "Advanced fullstack development using the MERN stack (MongoDB, Express, React, Node.js), API design, and deployment.",
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "hover:border-emerald-500/50"
    },
    {
      title: "Aptech Certificate",
      issuer: "Aptech Computer Education",
      image: "/Aptechcertificate.png",
      description: "Professional software engineering diploma covering software architecture, database management, and enterprise application development.",
      color: "from-purple-500/20 via-pink-500/10 to-transparent",
      borderColor: "hover:border-purple-500/50"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Resume Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Resume</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Take a look at my professional experience, academic background, and technical skillset.
          </p>
        </div>

        {/* Resume Preview Box */}
        <div className="flex flex-col items-center">
          <div className="relative group max-w-3xl w-full bg-surface border border-border-custom rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
            {/* Glowing background accent on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-hover:opacity-15 transition duration-500"></div>

            <div className="relative bg-surface p-4 sm:p-6 flex flex-col items-center">
              {/* Toolbar/Header */}
              <div className="w-full flex flex-col sm:flex-row justify-between items-center pb-4 mb-4 border-b border-border-custom/60 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main">Tabish_Ali_Resume.pdf</h3>
                    <p className="text-xs text-text-muted">MERN Stack Developer Portfolio Resume</p>
                  </div>
                </div>
                <a
                  href="/Resume.png"
                  download="Tabish_Ali_Resume.png"
                  className="flex items-center px-5 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/15 transition-all duration-200 cursor-pointer"
                >
                  <Download size={16} className="mr-2" /> Download Resume
                </a>
              </div>

              {/* Resume Image Display Container */}
              <div className="relative w-full max-h-[700px] overflow-y-auto rounded-xl border border-border-custom/50 bg-background/50 custom-scrollbar group/img">
                <img
                  src="/Resume.png"
                  alt="Tabish Ali Resume"
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                />
                {/* Floating overlay to expand */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <a
                    href="/Resume.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto px-6 py-3 bg-surface/90 hover:bg-surface text-text-main font-semibold rounded-full shadow-lg flex items-center space-x-2 transition-transform scale-90 group-hover/img:scale-100"
                  >
                    <span>View Fullscreen</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <div className="inline-flex p-2 bg-secondary/10 rounded-full text-secondary mb-4">
            <Award size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Certifications</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Official credentials and academic achievements validating my technical expertise and coding skills.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group flex flex-col bg-surface rounded-2xl border border-border-custom/80 ${cert.borderColor} hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden`}
            >
              {/* Certificate Image Box */}
              <div className="relative h-48 w-full bg-background/50 overflow-hidden flex items-center justify-center border-b border-border-custom/40">
                {/* Abstract Premium Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${cert.color} opacity-40 group-hover:opacity-20 transition-all duration-500`} />
                
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Glassmorphic Badge */}
                <span className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-surface/75 text-text-main border border-border-custom/30 shadow-sm">
                  <ShieldCheck size={12} className="text-secondary" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-text-muted font-medium mb-2">
                    <GraduationCap size={14} className="text-primary" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors mb-3">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                {/* View Fullsize Button */}
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-semibold text-primary group-hover:text-blue-400 transition-colors mt-auto w-fit"
                >
                  <span>View Certificate</span>
                  <ExternalLink size={16} className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
