import { Code, Briefcase, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface py-8 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold tracking-tighter text-primary">
              Dev<span className="text-white">Portfolio</span>.
            </span>
            <p className="text-slate-400 text-sm mt-2">
              Building digital products, brands, and experience.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Code size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Briefcase size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <MessageSquare size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Tabish. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
