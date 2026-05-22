import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Mail, LayoutGrid, LogOut, BookOpen } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'projects';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await axios.get(`${API_BASE}/api/projects`);
        setProjects(data);
      } else if (activeTab === 'messages') {
        const { data } = await axios.get(`${API_BASE}/api/messages`, getConfig());
        setMessages(data);
      } else if (activeTab === 'blogs') {
        const { data } = await axios.get(`${API_BASE}/api/blogs`);
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`${API_BASE}/api/projects/${id}`, getConfig());
      setProjects(projects.filter((p) => p._id !== id));
    } catch { alert('Failed to delete project.'); }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${API_BASE}/api/messages/${id}`, getConfig());
      setMessages(messages.filter((m) => m._id !== id));
    } catch { alert('Failed to delete message.'); }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await axios.delete(`${API_BASE}/api/blogs/id/${id}`, getConfig());
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch { alert('Failed to delete blog.'); }
  };

  const tabs = [
    { key: 'projects', label: 'Projects', icon: LayoutGrid },
    { key: 'blogs', label: 'Blogs', icon: BookOpen },
    { key: 'messages', label: 'Messages', icon: Mail },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">Admin <span className="text-primary">Dashboard</span></h1>
          <p className="text-slate-400 mt-2">Welcome back, <span className="text-slate-200">{userInfo?.name}</span></p>
        </div>
        <button onClick={handleLogout} className="mt-4 md:mt-0 flex items-center text-slate-400 hover:text-red-500 transition-colors text-sm">
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-10 bg-surface rounded-xl p-1 sm:p-1.5 border border-slate-800 max-w-md w-full">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === key ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon size={14} className="mr-1 sm:mr-1.5 shrink-0" /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Projects ({projects.length})</h2>
                <Link to="/admin/project/new" className="flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus size={16} className="mr-2" /> Add Project
                </Link>
              </div>
              {projects.length === 0 ? (
                <p className="text-slate-500 text-center py-16">No projects yet. Add your first one!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project._id} className="bg-surface rounded-xl border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden">
                      <div className="h-40 bg-slate-900 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-1 truncate">{project.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                        <div className="flex justify-end space-x-2">
                          <Link to={`/admin/project/edit/${project._id}`} className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                            <Edit2 size={16} />
                          </Link>
                          <button onClick={() => handleDeleteProject(project._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Blog Posts ({blogs.length})</h2>
                <Link to="/admin/blog/new" className="flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus size={16} className="mr-2" /> New Post
                </Link>
              </div>
              {blogs.length === 0 ? (
                <p className="text-slate-500 text-center py-16">No blog posts yet. Write your first one!</p>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="bg-surface rounded-xl border border-slate-800 hover:border-slate-700 transition-colors p-6 flex justify-between items-start">
                      <div className="flex-grow mr-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(blog.tags || []).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">{tag}</span>
                          ))}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                        <p className="text-slate-400 text-sm">/{blog.slug} · {new Date(blog.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <Link to={`/admin/blog/edit/${blog._id}`} className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDeleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold mb-8">Contact Messages ({messages.length})</h2>
              {messages.length === 0 ? (
                <p className="text-slate-500 text-center py-16">No messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg._id} className="bg-surface rounded-xl border border-slate-800 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{msg.subject || '(No Subject)'}</h3>
                          <p className="text-primary text-sm">{msg.name} &lt;{msg.email}&gt;</p>
                        </div>
                        <button onClick={() => handleDeleteMessage(msg._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10 shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-300 bg-slate-900/50 p-4 rounded-lg italic leading-relaxed">"{msg.message}"</p>
                      <p className="text-xs text-slate-500 mt-4">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
