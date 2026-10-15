import mongoose, { Schema } from 'mongoose';

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    featuredImage: { type: String, default: '' },
    author: { type: String, default: 'Brian Jamison' },
    category: { type: String, default: 'Market Updates' },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const BlogPost: any =
  mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;
