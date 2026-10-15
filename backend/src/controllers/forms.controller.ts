import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../lib/mongodb';
import { FormSubmission } from '../models/FormSubmission';

const SUBMISSIONS_FILE = path.resolve(__dirname, '../../data/form-submissions.json');

function readFallbackSubmissions(): any[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Failed reading fallback submissions', e);
  }
  return [
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
}

function writeFallbackSubmissions(submissions: any[]) {
  try {
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed writing fallback submissions', e);
  }
}

export class FormsController {
  static async submit(req: any, res: any) {
    try {
      const { name, email, phone, formType, service, serviceArea, details, notes } = req.body;

      if (!name) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }

      const newEntry = {
        name,
        email: email || '',
        phone: phone || '',
        formType: formType || 'inquiry',
        service: service || 'General Inquiry',
        serviceArea: serviceArea || 'Oklahoma City Metro',
        details: details || {},
        notes: notes || '',
        isRead: false,
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        const db = await connectToDatabase();
        if (db) {
          const doc = await FormSubmission.create(newEntry);
          return res.status(201).json({ success: true, submission: doc });
        }
      } catch (dbErr) {
        console.warn('DB write deferred for form submission, saving to fallback cache.');
      }

      const list = readFallbackSubmissions();
      const fallbackEntry = { id: 'sub_' + Date.now(), ...newEntry };
      list.unshift(fallbackEntry);
      writeFallbackSubmissions(list);

      return res.status(201).json({ success: true, submission: fallbackEntry });
    } catch (err: any) {
      console.error('Error in form submission:', err);
      return res.status(500).json({ success: false, error: err.message || 'Server error' });
    }
  }

  static async getAll(req: any, res: any) {
    try {
      try {
        const db = await connectToDatabase();
        if (db) {
          const docs = await FormSubmission.find({}).sort({ createdAt: -1 }).lean();
          if (docs && docs.length > 0) {
            return res.status(200).json({ success: true, submissions: docs });
          }
        }
      } catch (dbErr) {
        console.warn('DB fetch deferred for form submissions, using fallback cache.');
      }

      const list = readFallbackSubmissions();
      return res.status(200).json({ success: true, submissions: list });
    } catch (err: any) {
      console.error('Error fetching submissions:', err);
      return res.status(500).json({ success: false, error: 'Failed to fetch form submissions' });
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
          const updated = await FormSubmission.findByIdAndUpdate(id, updateData, { new: true });
          if (updated) {
            return res.status(200).json({ success: true, submission: updated });
          }
        }
      } catch (e) {
        // fallback
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
        // fallback
      }

      const list = readFallbackSubmissions().filter((s) => s.id !== id && s._id !== id);
      writeFallbackSubmissions(list);

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
