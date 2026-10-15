import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../lib/mongodb';
import { FormSubmission } from '../models/FormSubmission';

// Handle Serverless environments (Vercel/AWS Lambda) where root is read-only
const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const SUBMISSIONS_FILE = isServerless
  ? path.join('/tmp', 'form-submissions.json')
  : path.resolve(__dirname, '../../data/form-submissions.json');

const INITIAL_SAMPLES = [
  {
    id: 'sub_sample_1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@luxuryokc.com',
    phone: '(405) 921-4820',
    formType: 'valuation',
    service: 'Home Selling / 6-Phase Blueprint',
    serviceArea: 'Nichols Hills',
    details: {
      address: '1420 Grandview Blvd, Nichols Hills, OK',
      approxSqft: 4600,
      beds: 5,
      baths: 5,
      hasPool: true,
      estimatedTarget: 1450000,
    },
    notes: 'Wants full luxury CMA dossier dispatched immediately.',
    isRead: false,
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'sub_sample_2',
    name: 'Marcus Sterling',
    email: 'msterling@okcdev.com',
    phone: '(405) 819-3312',
    formType: 'consultation',
    service: 'Out-of-State Relocation Concierge',
    serviceArea: 'Edmond / Gaillardia',
    details: {
      topic: 'Private Gated Estate Advisory (Off-Market)',
      date: '2026-10-20',
      time: '02:00 PM',
    },
    notes: 'Relocating medical practice from Dallas to Oklahoma City.',
    isRead: true,
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'sub_sample_3',
    name: 'Dr. Sarah Jenkins',
    email: 'sjenkins@ouhsc.edu',
    phone: '(405) 271-9980',
    formType: 'valuation',
    service: 'Fair Pricing & Strategy',
    serviceArea: 'Crown Heights',
    details: {
      address: '812 NW 38th St, Oklahoma City, OK',
      approxSqft: 3200,
      beds: 4,
      baths: 3,
      hasPool: false,
      estimatedTarget: 785000,
    },
    notes: 'Planning spring listing.',
    isRead: false,
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

// Persistent in-memory global cache across serverless warm invocations
declare global {
  // eslint-disable-next-line no-var
  var __jamison_submissions_cache: any[] | undefined;
}

if (!global.__jamison_submissions_cache) {
  global.__jamison_submissions_cache = undefined;
}

function readFallbackSubmissions(): any[] {
  if (global.__jamison_submissions_cache && Array.isArray(global.__jamison_submissions_cache)) {
    return global.__jamison_submissions_cache;
  }

  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        global.__jamison_submissions_cache = data;
        return data;
      }
    }
  } catch (e) {
    console.warn('Fallback file read note:', e);
  }

  global.__jamison_submissions_cache = [...INITIAL_SAMPLES];
  return global.__jamison_submissions_cache;
}

function writeFallbackSubmissions(submissions: any[]) {
  global.__jamison_submissions_cache = submissions;
  try {
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Fallback file write note (in-memory persisted):', e);
  }
}

export class FormsController {
  static async submit(req: any, res: any) {
    try {
      const { name, email, phone, formType, service, serviceArea, details, notes } = req.body;

      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }

      const generatedId = 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const newEntry = {
        id: generatedId,
        name: name.trim(),
        email: (email || '').trim(),
        phone: (phone || '').trim(),
        formType: formType || 'inquiry',
        service: service || 'General Inquiry',
        serviceArea: serviceArea || 'Oklahoma City Metro',
        details: details || {},
        notes: notes || '',
        isRead: false,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 1. Immediately record in memory cache and local fallback
      const list = readFallbackSubmissions();
      list.unshift(newEntry);
      writeFallbackSubmissions(list);

      // 2. Also attempt MongoDB insertion if available
      try {
        const db = await connectToDatabase();
        if (db) {
          const doc = await FormSubmission.create(newEntry);
          if (doc) {
            newEntry.id = doc._id.toString();
          }
        }
      } catch (dbErr: any) {
        console.warn('MongoDB deferred for submission, saved to high-performance cache:', dbErr?.message);
      }

      console.log(`[Form Submission Received] ID: ${newEntry.id} - ${newEntry.name} (${newEntry.formType})`);
      return res.status(201).json({ success: true, submission: newEntry });
    } catch (err: any) {
      console.error('Error in form submission:', err);
      return res.status(500).json({ success: false, error: err.message || 'Server error' });
    }
  }

  static async getAll(req: any, res: any) {
    try {
      let dbDocs: any[] = [];
      try {
        const db = await connectToDatabase();
        if (db) {
          const docs = await FormSubmission.find({}).sort({ createdAt: -1 }).lean();
          if (docs && Array.isArray(docs)) {
            dbDocs = docs.map((d: any) => ({
              ...d,
              id: d._id ? d._id.toString() : d.id,
            }));
          }
        }
      } catch (dbErr: any) {
        console.warn('MongoDB fetch deferred for form submissions, using fallback cache:', dbErr?.message);
      }

      const fallbackList = readFallbackSubmissions();

      // Merge MongoDB docs and fallback cache without duplicates
      const seenIds = new Set<string>();
      const combined: any[] = [];

      // First add fallback list (which has immediate in-memory submissions)
      for (const item of fallbackList) {
        const id = item.id || (item._id ? item._id.toString() : null);
        if (id && !seenIds.has(id)) {
          seenIds.add(id);
          combined.push(item);
        }
      }

      // Then add DB docs
      for (const item of dbDocs) {
        const id = item.id || (item._id ? item._id.toString() : null);
        if (id && !seenIds.has(id)) {
          seenIds.add(id);
          combined.push(item);
        }
      }

      // Sort newest first
      combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return res.status(200).json({ success: true, submissions: combined });
    } catch (err: any) {
      console.error('Error fetching submissions:', err);
      const fallbackList = readFallbackSubmissions();
      return res.status(200).json({ success: true, submissions: fallbackList });
    }
  }

  static async markRead(req: any, res: any) {
    try {
      const { id } = req.params;
      const { isRead, status } = req.body;

      try {
        const db = await connectToDatabase();
        if (db) {
          const updateData: any = {};
          if (typeof isRead === 'boolean') updateData.isRead = isRead;
          if (status) updateData.status = status;
          await FormSubmission.findByIdAndUpdate(id, updateData, { new: true });
        }
      } catch (e) {
        // DB note
      }

      const list = readFallbackSubmissions();
      const item = list.find((s) => s.id === id || s._id === id);
      if (item) {
        if (typeof isRead === 'boolean') item.isRead = isRead;
        if (status) item.status = status;
        writeFallbackSubmissions(list);
        return res.status(200).json({ success: true, submission: item });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      try {
        const db = await connectToDatabase();
        if (db) {
          await FormSubmission.findByIdAndDelete(id);
        }
      } catch (e) {
        // DB note
      }

      const list = readFallbackSubmissions().filter((s) => s.id !== id && s._id !== id);
      writeFallbackSubmissions(list);

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
