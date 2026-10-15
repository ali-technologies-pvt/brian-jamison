import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './mongodb';
import { SiteContent } from '../models/SiteContent';

const FALLBACK_FILE_PATH = path.resolve(__dirname, '../../data/site-content.json');

// In-memory cache for ultra-fast response
const memoryContentStore: Record<string, string> = {
  'home_hero_title': 'OKC Luxury Real Estate & 6-Phase Seller Blueprint',
  'home_hero_subtitle': 'Brian Jamison · Top 2% Producer · $70M+ Volume Sold · Jamison Real Estate',
  'home_valuation_cta': 'Get Confidential Valuation',
  'seller_guarantee_badge': '100% Risk-Free · Cancel Anytime Pledge',
};

// Ensure data directory exists
function ensureFallbackFile() {
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(memoryContentStore, null, 2), 'utf-8');
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
