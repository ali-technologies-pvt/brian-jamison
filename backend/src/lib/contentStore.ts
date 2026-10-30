import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './mongodb';
import { SiteContent } from '../models/SiteContent';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.TMPDIR);
const SEED_FILE_PATH = path.resolve(__dirname, '../../data/site-content.json');
const FALLBACK_FILE_PATH = isServerless
  ? path.resolve(process.env.TMPDIR || '/tmp', 'site-content.json')
  : SEED_FILE_PATH;

// Directly bundle seed data so it is never missing on Vercel serverless builds
let bundledSeedData: Record<string, string> = {
  'home_hero_title': 'OKC Luxury Real Estate & 6-Phase Seller Blueprint',
  'home_hero_subtitle': 'Brian Jamison · Top 2% Producer · $70M+ Volume Sold · Jamison Real Estate',
  'home_valuation_cta': 'Get Confidential Valuation',
  'seller_guarantee_badge': '100% Risk-Free · Cancel Anytime Pledge',
};

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const seedJson = require('../../data/site-content.json');
  bundledSeedData = { ...bundledSeedData, ...seedJson };
} catch {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const seedJson = require('../../../backend/data/site-content.json');
    bundledSeedData = { ...bundledSeedData, ...seedJson };
  } catch {
    // Fall back to default in-memory keys
  }
}

// In-memory cache for ultra-fast response
const memoryContentStore: Record<string, string> = { ...bundledSeedData };

// Ensure data directory exists and seed initial data if in serverless /tmp
function ensureFallbackFile() {
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      if (fs.existsSync(SEED_FILE_PATH)) {
        const seedData = fs.readFileSync(SEED_FILE_PATH, 'utf-8');
        fs.writeFileSync(FALLBACK_FILE_PATH, seedData, 'utf-8');
      } else {
        fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(memoryContentStore, null, 2), 'utf-8');
      }
    }
  } catch {
    // If filesystem is read-only or restricted, memory cache is maintained
  }
}

function readFallbackFile(): Record<string, string> {
  try {
    ensureFallbackFile();
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const data = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
      return { ...memoryContentStore, ...JSON.parse(data) };
    }
  } catch {
    // Ignore and return memory store
  }
  return memoryContentStore;
}

function writeFallbackFile(key: string, content: string) {
  memoryContentStore[key] = content;
  try {
    ensureFallbackFile();
    const current = readFallbackFile();
    current[key] = content;
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(current, null, 2), 'utf-8');
  } catch {
    // Memory store remains updated
  }
}

/**
 * Get all content or specific key
 */
export async function getSiteContent(key?: string): Promise<{ success: boolean; content: any }> {
  try {
    const db = await connectToDatabase();
    if (db) {
      if (key) {
        const item = await SiteContent.findOne({ key }).lean();
        return {
          success: true,
          content: item ? item.content : readFallbackFile()[key] || null,
        };
      }

      const allItems = await SiteContent.find({}).lean();
      const contentMap: Record<string, string> = { ...readFallbackFile() };
      for (const doc of allItems) {
        contentMap[doc.key] = doc.content;
      }
      return { success: true, content: contentMap };
    }
  } catch (err: any) {
    console.warn('[Storage Notice] Database deferred (' + (err?.message || 'timeout') + '). Serving fallback cache.');
  }

  // Graceful fallback from disk/memory
  const fallback = readFallbackFile();
  if (key) {
    return { success: true, content: fallback[key] || null };
  }
  return { success: true, content: fallback };
}

/**
 * Update content by key
 */
export async function updateSiteContent(
  key: string,
  content: string
): Promise<{
  success: boolean;
  key: string;
  content: string;
  updatedAt: Date;
  source: 'mongodb' | 'fallback';
}> {
  const cleanKey = key.trim();
  writeFallbackFile(cleanKey, content);

  try {
    const db = await connectToDatabase();
    if (db) {
      const updated = await SiteContent.findOneAndUpdate(
        { key: cleanKey },
        { content, updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return {
        success: true,
        key: updated.key,
        content: updated.content,
        updatedAt: updated.updatedAt,
        source: 'mongodb',
      };
    }
  } catch (err: any) {
    console.warn('[Storage Notice] Database write deferred (' + (err?.message || 'timeout') + '). Content saved to local cache.');
  }

  return {
    success: true,
    key: cleanKey,
    content,
    updatedAt: new Date(),
    source: 'fallback',
  };
}

/**
 * Batch update multiple keys at once
 */
export async function batchUpdateSiteContent(
  items: Record<string, string>
): Promise<{ success: boolean; count: number; source: 'mongodb' | 'fallback' }> {
  if (!items || typeof items !== 'object') {
    return { success: false, count: 0, source: 'fallback' };
  }

  const entries = Object.entries(items);
  for (const [key, val] of entries) {
    if (typeof val === 'string') {
      writeFallbackFile(key.trim(), val);
    }
  }

  try {
    const db = await connectToDatabase();
    if (db) {
      const ops = entries
        .filter(([k, v]) => typeof v === 'string')
        .map(([key, content]) => ({
          updateOne: {
            filter: { key: key.trim() },
            update: { $set: { content, updatedAt: new Date() } },
            upsert: true,
          },
        }));

      if (ops.length > 0) {
        await SiteContent.bulkWrite(ops);
      }
      return { success: true, count: ops.length, source: 'mongodb' };
    }
  } catch (err: any) {
    console.warn('[Storage Notice] Database bulk write deferred (' + (err?.message || 'timeout') + '). Content saved to local cache.');
  }

  return { success: true, count: entries.length, source: 'fallback' };
}
