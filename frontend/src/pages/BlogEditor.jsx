import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    image: '',
    tags: '',
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  useEffect(() => {
    if (isEditing) {
      const fetchBlog = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/blogs/id/${id}`);
          setForm({
            title: data.title,
            slug: data.slug,
            content: data.content,
            image: data.image || '',
            tags: (data.tags || []).join(', '),
          });
        } catch (err) {
          setError('Failed to load blog post.');
        }
      };
      fetchBlog();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && !isEditing) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const blogData = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/blogs/id/${id}`, blogData, config);
      } else {
        await axios.post('http://localhost:5000/api/blogs', blogData, config);
      }
      navigate('/admin?tab=blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog post.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Link to="/admin" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-2 text-sm">
            <ArrowLeft size={14} className="mr-1.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit' : 'New'} <span className="text-primary">Blog Post</span></h1>
        </div>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="flex items-center px-4 py-2 bg-surface border border-slate-700 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Eye size={16} className="mr-2" /> {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6 text-sm">{error}</div>
      )}

      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-surface rounded-2xl border border-slate-800 p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold mb-4">{form.title || 'Untitled Post'}</h2>
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-p:text-slate-300
            prose-a:text-primary prose-code:bg-slate-800 prose-code:text-secondary
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
            prose-blockquote:border-primary prose-blockquote:text-slate-400
            prose-strong:text-white prose-li:text-slate-300">
            <ReactMarkdown>{form.content || '*Nothing to preview yet...*'}</ReactMarkdown>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="My Awesome Blog Post" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL) *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="my-awesome-blog-post" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className={inputClass} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="React, Node.js, MongoDB" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown) *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={20}
              className={`${inputClass} resize-none font-mono text-sm`}
              placeholder="# Your Blog Post&#10;&#10;Start writing in **Markdown**..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </span>
              ) : (
                <><Save size={16} className="mr-2" /> {isEditing ? 'Update Post' : 'Publish Post'}</>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogEditor;
