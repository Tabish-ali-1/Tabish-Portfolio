import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true, default: 'Admin' },
  image: { type: String },
  tags: [{ type: String }],
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
