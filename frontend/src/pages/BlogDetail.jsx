import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blogs/${slug}`);
        setBlog(data);
      } catch (err) {
        setError('Blog post not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-slate-400 text-xl mb-6">{error}</p>
      <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>

        {blog.image && (
          <div className="h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-10">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {(blog.tags || []).map((tag) => (
            <span key={tag} className="inline-flex items-center text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
              <Tag size={10} className="mr-1" /> {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

        <div className="flex items-center space-x-6 text-sm text-slate-400 mb-10 pb-10 border-b border-slate-800">
          <span className="flex items-center">
            <User size={14} className="mr-1.5" /> {blog.author}
          </span>
          <span className="flex items-center">
            <Calendar size={14} className="mr-1.5" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-secondary
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
          prose-blockquote:border-primary prose-blockquote:text-slate-400
          prose-strong:text-white prose-li:text-slate-300">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
