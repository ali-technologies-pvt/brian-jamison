import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../lib/mongodb';
import { User } from '../models/User';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.TMPDIR);
const SEED_FILE = path.resolve(__dirname, '../../data/users.json');
const USERS_FILE = isServerless
  ? path.resolve(process.env.TMPDIR || '/tmp', 'users.json')
  : SEED_FILE;

let memoryUsersStore: any[] = [];

const DEFAULT_USERS = [
  {
    id: 'usr_admin',
    username: 'Admin',
    email: 'admin@jamisonrealestate.com',
    name: 'Brian Jamison',
    role: 'Administrator',
    isActive: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 60).toISOString(),
  },
  {
    id: 'usr_sarah',
    username: 'sarah_marketing',
    email: 'sarah@jamisonrealestate.com',
    name: 'Sarah Montgomery',
    role: 'Editor',
    isActive: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
  },
  {
    id: 'usr_david',
    username: 'david_writer',
    email: 'david.c@contentpartners.com',
    name: 'David Chen',
    role: 'Author',
    isActive: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
];

function readFallbackUsers(): any[] {
  if (memoryUsersStore.length > 0) {
    return memoryUsersStore;
  }
  try {
    if (fs.existsSync(USERS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryUsersStore = parsed;
        return memoryUsersStore;
      }
    }
  } catch (e) {
    console.error('Failed reading fallback users', e);
  }
  memoryUsersStore = [...DEFAULT_USERS];
  writeFallbackUsers(memoryUsersStore);
  return memoryUsersStore;
}

function writeFallbackUsers(users: any[]) {
  memoryUsersStore = [...users];
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Fallback users disk save skipped/read-only, cached in memory');
  }
}

export class UsersController {
  static async getAll(req: any, res: any) {
    try {
      try {
        const db = await connectToDatabase();
        if (db) {
          // If User collection has 0 documents, seed initial default users into MongoDB
          const count = await User.countDocuments();
          if (count === 0) {
            const defaults = readFallbackUsers();
            for (const u of defaults) {
              const hash = await bcrypt.hash('#Imthepassword@123#', 10);
              await User.create({
                username: u.username,
                email: u.email,
                name: u.name,
                role: u.role,
                passwordHash: hash,
                isActive: true,
                createdAt: u.createdAt || new Date(),
              });
            }
          }
          const docs = await User.find({}, '-passwordHash').sort({ createdAt: -1 }).lean();
          if (docs && docs.length > 0) {
            memoryUsersStore = docs;
            return res.status(200).json({ success: true, users: docs });
          }
        }
      } catch (dbErr) {
        console.warn('DB fetch deferred for users, using fallback cache.');
      }

      const list = readFallbackUsers();
      return res.status(200).json({ success: true, users: list });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async create(req: any, res: any) {
    try {
      const { username, email, password, name, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ success: false, error: 'Username, email, and password are required' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        name: name || username,
        role: role || 'Editor',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        const db = await connectToDatabase();
        if (db) {
          // Check if username or email already exists in DB
          const existing = await User.findOne({
            $or: [{ username: newUser.username }, { email: newUser.email }]
          });
          if (existing) {
            return res.status(400).json({ success: false, error: 'Username or email already exists in database' });
          }

          const doc = await User.create(newUser);
          const safeDoc = doc.toObject();
          delete safeDoc.passwordHash;

          const list = readFallbackUsers().filter((u: any) => u.username.toLowerCase() !== username.toLowerCase());
          list.unshift(safeDoc);
          writeFallbackUsers(list);

          return res.status(201).json({ success: true, user: safeDoc });
        }
      } catch (dbErr) {
        console.warn('DB write deferred for user, saving to fallback cache.');
      }

      const list = readFallbackUsers();
      if (list.some((u: any) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ success: false, error: 'Username or email already exists' });
      }

      const entry = {
        id: 'usr_' + Date.now(),
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      list.unshift(entry);
      writeFallbackUsers(list);

      return res.status(201).json({ success: true, user: entry });
    } catch (err: any) {
      console.error('Error creating user:', err);
      return res.status(500).json({ success: false, error: err.message || 'Failed to create user' });
    }
  }

  static async updateRole(req: any, res: any) {
    try {
      const { id } = req.params;
      const { role, isActive } = req.body;

      try {
        const db = await connectToDatabase();
        if (db) {
          const updateData: any = {};
          if (role) updateData.role = role;
          if (typeof isActive === 'boolean') updateData.isActive = isActive;
          const updated = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-passwordHash');
          if (updated) return res.status(200).json({ success: true, user: updated });
        }
      } catch (e) {}

      const list = readFallbackUsers();
      const user = list.find((u: any) => u.id === id || u._id === id);
      if (user) {
        if (role) user.role = role;
        if (typeof isActive === 'boolean') user.isActive = isActive;
        writeFallbackUsers(list);
        return res.status(200).json({ success: true, user });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  static async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      if (id === 'usr_admin') {
        return res.status(400).json({ success: false, error: 'Cannot delete primary root Administrator' });
      }

      try {
        const db = await connectToDatabase();
        if (db) {
          await User.findByIdAndDelete(id);
        }
      } catch (e) {}

      const list = readFallbackUsers().filter((u: any) => u.id !== id && u._id !== id);
      writeFallbackUsers(list);

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}
