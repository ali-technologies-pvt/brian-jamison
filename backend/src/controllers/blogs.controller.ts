import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../lib/mongodb';
import { BlogPost } from '../models/BlogPost';

const BLOGS_FILE = path.resolve(__dirname, '../../data/blog-posts.json');

function readFallbackBlogs(): any[] {
  try {
    if (fs.existsSync(BLOGS_FILE)) {
      return JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed reading fallback blogs', e);
  }
  return [
    {
      id: 'post_1',
      title: 'Oklahoma City Luxury Market Report Q3: Why Inventory in Nichols Hills Remains Constrained',
      slug: 'okc-luxury-market-report-q3-nichols-hills',
      excerpt: 'Comprehensive analysis of luxury absorption rates, days-on-market metrics, and high-net-worth migration trends across the Oklahoma City metro area.',
      content: `<h2>Executive Summary</h2><p>The Oklahoma City luxury housing sector continues to exhibit extraordinary price resilience heading into the second half of the year. Nichols Hills and Gaillardia in particular have posted sub-14-day escrow timelines for properly positioned, media-optimized estates.</p><h3>Key Findings</h3><ul><li><strong>Absorption Velocity:</strong> Properties listed above $1.2M with 4K cinematic walkthroughs saw 240% higher out-of-state inquiry rates.</li><li><strong>Cash Transactions:</strong> Over 48% of closings in Nichols Hills and Heritage Hills settled without financing contingencies.</li><li><strong>Pricing Accuracy:</strong> Homes priced utilizing our proprietary 3-Tier Strategy achieved 99.2% of asking price.</li></ul>`,
      featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      author: 'Brian Jamison',
      category: 'Market Intelligence',
      tags: ['Nichols Hills', 'Market Report', 'Luxury Real Estate', 'OKC Metro'],
      status: 'published',
      metaTitle: 'OKC Luxury Market Report Q3 | Nichols Hills Real Estate by Brian Jamison',
      metaDescription: 'In-depth market data, average sales prices, and luxury estate demand across Nichols Hills and Edmond, Oklahoma.',
      canonicalUrl: 'https://brianjamisonrealtor.com/blog/okc-luxury-market-report-q3-nichols-hills',
      createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    },
    {
      id: 'post_2',
      title: 'The 6-Phase Seller Blueprint: How High-Definition Media Outperforms Standard MLS Listings',
      slug: '6-phase-seller-blueprint-cinematic-media-advantage',
      excerpt: 'Discover why standard iPhone photos cost sellers tens of thousands in equity and how cinematic drone storytelling creates bidding wars.',
      content: `<h2>The Era of Passive MLS Listing is Dead</h2><p>Today's luxury buyer does not merely look at bedroom counts; they purchase lifestyle, prestige, and emotional resonance. Our 6-Phase Blueprint treats every premier Oklahoma residence like a Hollywood production.</p><h3>The Direct Mathematical Proof</h3><p>Homes syndicated with 60FPS drone sequences and architectural twilight imagery generate over 5x more saved favorites across Zillow Premier and Realtor.com platforms.</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      author: 'Brian Jamison',
      category: 'Seller Blueprint',
      tags: ['Video Marketing', 'Home Selling', 'OKC Real Estate', 'Listing Strategy'],
      status: 'published',
      metaTitle: '6-Phase Seller Blueprint: Cinematic Real Estate Marketing in OKC',
      metaDescription: 'Learn how Brian Jamisons video-first marketing engine delivers top dollar for luxury homes in Oklahoma City and Edmond.',
      canonicalUrl: 'https://brianjamisonrealtor.com/blog/6-phase-seller-blueprint-cinematic-media-advantage',
      createdAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
    },
  ];
}

function writeFallbackBlogs(blogs: any[]) {
  try {
    const dir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed writing fallback blogs', e);
  }
}

export class BlogsController {
  static async getAll(req: any, res: any) {
    try {
      try {
        const db = await connectToDatabase();
        if (db) {
          const posts = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
          if (posts && posts.length > 0) {
            return res.status(200).json({ success: true, posts });
          }
        }
      } catch (dbErr) {
        console.warn('DB fetch deferred for blog posts, using fallback cache.');
      }

      const list = readFallbackBlogs();
      return res.status(200).json({ success: true, posts: list });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getBySlug(req: any, res: any) {
    try {
      const { slug } = req.params;
      try {
        const db = await connectToDatabase();
        if (db) {
          const post = await BlogPost.findOne({ slug }).lean();
          if (post) return res.status(200).json({ success: true, post });
        }
      } catch (e) {}

      const list = readFallbackBlogs();
      const post = list.find((p) => p.slug === slug || p.id === slug);
      if (post) return res.status(200).json({ success: true, post });

      return res.status(404).json({ success: false, error: 'Post not found' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async save(req: any, res: any) {
    try {
      const { id, title, slug, excerpt, content, featuredImage, author, category, tags, status, metaTitle, metaDescription, canonicalUrl } = req.body;

      if (!title) {
        return res.status(400).json({ success: false, error: 'Title is required' });
      }

      const cleanSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

      const postData = {
        title,
        slug: cleanSlug,
        excerpt: excerpt || '',
        content: content || '',
        featuredImage: featuredImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        author: author || 'Brian Jamison',
        category: category || 'General Updates',
        tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
        status: status || 'published',
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || '',
        canonicalUrl: canonicalUrl || '',
        updatedAt: new Date(),
      };

      try {
        const db = await connectToDatabase();
        if (db) {
          let savedDoc;
          if (id && id.length === 24) {
            savedDoc = await BlogPost.findByIdAndUpdate(id, postData, { new: true, upsert: true });
          } else {
            savedDoc = await BlogPost.findOneAndUpdate({ slug: cleanSlug }, postData, { new: true, upsert: true });
          }
          if (savedDoc) {
            return res.status(200).json({ success: true, post: savedDoc });
          }
        }
      } catch (dbErr) {
        console.warn('DB write deferred for blog, saving to fallback cache.');
      }

      const list = readFallbackBlogs();
      const existingIdx = list.findIndex((p) => p.id === id || p.slug === cleanSlug);
      const entry = {
        id: id || 'post_' + Date.now(),
        ...postData,
        createdAt: existingIdx >= 0 ? list[existingIdx].createdAt : new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        list[existingIdx] = entry;
      } else {
        list.unshift(entry);
      }
      writeFallbackBlogs(list);

      return res.status(200).json({ success: true, post: entry });
    } catch (err: any) {
      console.error('Error saving blog post:', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to save blog post' });
    }
  }

  static async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      try {
        const db = await connectToDatabase();
        if (db) {
          await BlogPost.findByIdAndDelete(id);
        }
      } catch (e) {}

      const list = readFallbackBlogs().filter((p) => p.id !== id && p._id !== id && p.slug !== id);
      writeFallbackBlogs(list);

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
