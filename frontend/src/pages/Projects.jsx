import { motion } from 'framer-motion';
import { ExternalLink, Code, Laptop, Server, Database, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Projects = ({ filter: propFilter, setFilter: propSetFilter }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Use passed props if available, otherwise fallback to local/router state
  const [localFilter, setLocalFilter] = useState(null);
  const filter = propFilter !== undefined ? propFilter : (location.state?.filter || localFilter);
  const setFilter = propSetFilter || setLocalFilter;

  const allLiveProjects = [
    { name: "Taskify – Team Task Collaboration Tool", url: "https://mern-task-11-v7io.onrender.com", image: "/Taskify.png" },
    { name: "SkillSync – Online Course Progress Tracker", url: "https://mern-task-9-a8n3.onrender.com", image: "/Skillsync.png" },
    { name: "RentSmart – Property Rental Management System", url: "https://mern-task-8-frontend.onrender.com", image: "/Rentsmart.png" },
    { name: "Modern Healthcare MediConnect", url: "https://mern-task-7-frontend.onrender.com", image: "/Modernhealthcare.png" },
    { name: "ShopSphere", url: "https://mern-task-6-frontend.onrender.com", extra: "admin@shopsphere.com / admin123", image: "/Shopsphere.png" },
    { name: "LuxeStore", url: "https://mern-task-5-frontend.onrender.com", extra: "admin@luxestore.com / password123", image: "/Luxestore.png" },
    { name: "Fitness Tracker App", url: "https://mern-task-4-frontend.onrender.com", image: "/Fitness.png" },
    { name: "Project Management Tool (Trello Clone)", url: "https://tabish-task-3-frontend.onrender.com", image: "/Projectmanagment.png" },
    { name: "Learning Management System", url: "https://tabish-task-2-frontend.onrender.com", image: "/Learning%20managmentsystem.png" },
    { name: "Online Code Collaboration Platform", url: "https://example-frontend-jcq7.onrender.com", image: "/Online%20code.png" },
    { name: "Currency Converter", url: "https://tabish-ali-1.github.io/Task-12/", image: "/currencyconverter.png" },
    { name: "Weather Dashboard", url: "https://tabish-ali-1.github.io/Task-9/", image: "/weather.png" },
    { name: "Event Invitation  ", url: "https://tabish-ali-1.github.io/Task-10/", image: "/eventinvitation.png" },
    { name: "Login Form ", url: "https://tabish-ali-1.github.io/aykays-task-3/signup", image: "/login%20form.png" },
    { name: "Stop Watch ", url: "https://tabish-ali-1.github.io/task-4-aykays/", image: "/stopwatch.png" },
    { name: "Pricing System ", url: "https://tabish-ali-1.github.io/Task-5/", image: "/pricingsystem.png" },
    { name: "Expense Tracker ", url: "https://tabish-ali-1.github.io/aykays-task-6/", image: "/expensetraker.png" },
    { name: "Product Grids ", url: "https://tabish-ali-1.github.io/task-7/", image: "/productgrid.png" },
  ];

  const frontendProjectsList = [
    "Currency Converter",
    "Weather Dashboard",
    "Event Invitation  ",
    "Login Form ",
    "Stop Watch ",
    "Pricing System ",
    "Expense Tracker ",
    "Product Grids "
  ];

  const backendProjectsList = [
    "Online Code Collaboration Platform",
    "Learning Management System",
    "Project Management Tool (Trello Clone)",
    "Fitness Tracker App",
    "LuxeStore",
    "ShopSphere",
    "Modern Healthcare MediConnect",
    "RentSmart – Property Rental Management System",
    "SkillSync – Online Course Progress Tracker",
    "Taskify – Team Task Collaboration Tool",
  ];

  const databaseProjectsList = [
    "ShopSphere",
    "LuxeStore",
    "RentSmart – Property Rental Management System",
    "Taskify – Team Task Collaboration Tool",
    "SkillSync – Online Course Progress Tracker",
    "Modern Healthcare MediConnect",
    "Fitness Tracker App",
  ];

  const getProjectCategory = (name) => {
    if (frontendProjectsList.includes(name)) return 'Frontend';
    if (databaseProjectsList.includes(name)) return 'Full-Stack / DB';
    if (backendProjectsList.includes(name)) return 'Full-Stack / API';
    return 'Web Application';
  };

  const getGradientClass = (name) => {
    if (frontendProjectsList.includes(name)) {
      return 'from-cyan-500/20 via-blue-500/10 to-transparent';
    }
    if (databaseProjectsList.includes(name)) {
      return 'from-emerald-500/20 via-teal-500/10 to-transparent';
    }
    return 'from-purple-500/20 via-primary/10 to-transparent';
  };

  const renderPlaceholderIcon = (name) => {
    const size = 38;
    const className = "text-text-muted/30 absolute transform group-hover:scale-110 transition-transform duration-500";
    if (frontendProjectsList.includes(name)) {
      return <Laptop size={size} className={className} />;
    }
    if (databaseProjectsList.includes(name)) {
      return <Database size={size} className={className} />;
    }
    return <Server size={size} className={className} />;
  };

  const filterOptions = [
    { id: null, label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const displayedLiveProjects = filter === 'frontend'
    ? allLiveProjects.filter(p => frontendProjectsList.includes(p.name))
    : filter === 'backend'
    ? allLiveProjects.filter(p => backendProjectsList.includes(p.name))
    : allLiveProjects;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/projects');
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A selection of my recent work. These projects highlight my experience in building full-stack applications and solving real-world problems.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Live Demo Projects</h2>
              <p className="text-text-muted max-w-2xl mx-auto mb-8">
                Explore my completed projects hosted on Render. Click to view live demo or source code.
              </p>
              
              {/* Premium Button Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filterOptions.map((option) => {
                  const isActive = filter === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setFilter(option.id)}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-lg shadow-primary/25 scale-105'
                          : 'bg-surface/50 text-text-muted border-border-custom/60 hover:text-text-main hover:border-primary/40 hover:bg-surface/80'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Responsive Project Banners Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                {displayedLiveProjects.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col bg-surface rounded-2xl border border-border-custom hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Project Image Box with abstract premium fallbacks */}
                    <div className="relative h-44 w-full bg-background/50 overflow-hidden flex items-center justify-center border-b border-border-custom/40">
                      {link.image ? (
                        <img 
                          src={link.image} 
                          alt={link.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-tr ${getGradientClass(link.name)} opacity-80 transition-transform duration-500 group-hover:scale-105`} />
                          {renderPlaceholderIcon(link.name)}
                        </>
                      )}
                      
                      {/* Glassmorphic Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-surface/75 text-text-main border border-border-custom/30 shadow-sm">
                        {getProjectCategory(link.name)}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-snug mb-3">
                          {link.name}
                        </h3>
                        {link.extra && (
                          <div className="text-[11px] text-text-muted font-mono bg-background/80 px-3 py-2 rounded-lg border border-border-custom/50 break-all mb-4">
                            <strong>Credentials:</strong> {link.extra}
                          </div>
                        )}
                      </div>
                      
                      {/* View Button Footer */}
                      <div className="flex items-center text-sm font-semibold text-primary group-hover:text-blue-400 transition-colors mt-2">
                        <span>Visit Live Demo</span>
                        <ExternalLink size={16} className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Custom/DB Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface rounded-2xl overflow-hidden border border-border-custom hover:border-primary/50 transition-all group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-text-muted mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-background rounded-full text-xs font-medium text-text-main border border-border-custom">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-text-muted hover:text-text-main transition-colors"
                      >
                        <Code size={18} className="mr-2" /> Code
                      </a>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-primary hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={18} className="mr-2" /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
