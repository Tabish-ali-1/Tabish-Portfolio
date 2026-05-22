import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          const { data } = await axios.get(`${API_BASE}/api/projects`);
          const project = data.find((p) => p._id === id);
          if (project) {
            setForm({
              title: project.title,
              description: project.description,
              image: project.image,
              technologies: (project.technologies || []).join(', '),
              githubLink: project.githubLink || '',
              liveLink: project.liveLink || '',
            });
            setImagePreview(project.image);
          }
        } catch (err) {
          setError('Failed to load project.');
        }
      };
      fetchProject();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'image') setImagePreview(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const uploadConfig = { headers: { ...config.headers, 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post(`${API_BASE}/api/upload`, formData, uploadConfig);
      setForm((prev) => ({ ...prev, image: data.imageUrl }));
      setImagePreview(data.imageUrl);
    } catch {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const projectData = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/api/projects/${id}`, projectData, config);
      } else {
        await axios.post(`${API_BASE}/api/projects`, projectData, config);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link to="/admin" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-3 text-sm">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit' : 'New'} <span className="text-primary">Project</span></h1>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6 text-sm">{error}</div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input name="image" value={form.image} onChange={handleChange} className={`${inputClass} flex-grow`} placeholder="https://... or upload below" />
              <label className="flex items-center justify-center px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors text-sm font-medium text-slate-300 shrink-0">
                {uploading ? (
                  <span className="flex items-center"><div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>Uploading...</span>
                ) : (
                  <span className="flex items-center"><Upload size={16} className="mr-2" /> Upload</span>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {imagePreview && (
              <div className="mt-4 relative h-48 rounded-xl overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => { setForm((p) => ({ ...p, image: '' })); setImagePreview(''); }} className="absolute top-2 right-2 p-1.5 bg-slate-900/80 rounded-full text-slate-400 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="My Awesome Project" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder="Describe your project..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Technologies (comma separated)</label>
            <input name="technologies" value={form.technologies} onChange={handleChange} className={inputClass} placeholder="React, Node.js, MongoDB, Tailwind CSS" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Link</label>
              <input name="githubLink" value={form.githubLink} onChange={handleChange} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Live Link</label>
              <input name="liveLink" value={form.liveLink} onChange={handleChange} className={inputClass} placeholder="https://yoursite.com" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading || uploading} className="flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center"><div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>Saving...</span>
              ) : (
                <><Save size={16} className="mr-2" /> {isEditing ? 'Update Project' : 'Create Project'}</>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectEditor;
