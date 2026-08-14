import fs from 'fs';
import path from 'path';
import { PortfolioData, ContactMessage } from './types';
import { INITIAL_DATA, hashPassword } from './initialData';

export { INITIAL_DATA, hashPassword };

// Standard paths
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Fallback paths for Serverless (Vercel read-only filesystem)
const TMP_DIR = path.join('/tmp', 'data');
const TMP_DATA_FILE = path.join(TMP_DIR, 'portfolio.json');
const TMP_MESSAGES_FILE = path.join(TMP_DIR, 'messages.json');

// Safe directory initialization that never throws
function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {
        // Ignored on serverless read-only FS
      }
    }
    if (!fs.existsSync(DATA_FILE)) {
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      } catch {
        // Ignored on serverless read-only FS
      }
    }
    if (!fs.existsSync(MESSAGES_FILE)) {
      try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf-8');
      } catch {
        // Ignored on serverless read-only FS
      }
    }
  } catch (err) {
    console.warn('Filesystem init warning:', err);
  }
}

export function getPortfolioData(): PortfolioData {
  ensureDataFile();
  // 1. Try reading from process.cwd()/data/portfolio.json
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return {
        ...INITIAL_DATA,
        ...data,
        profile: { ...INITIAL_DATA.profile, ...(data.profile || {}) },
        siteSettings: { ...INITIAL_DATA.siteSettings, ...(data.siteSettings || {}) }
      };
    }
  } catch (err) {
    console.warn('Could not read DATA_FILE, checking TMP fallback:', err);
  }

  // 2. Try reading from /tmp/data/portfolio.json (for runtime serverless updates)
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const raw = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return {
        ...INITIAL_DATA,
        ...data,
        profile: { ...INITIAL_DATA.profile, ...(data.profile || {}) },
        siteSettings: { ...INITIAL_DATA.siteSettings, ...(data.siteSettings || {}) }
      };
    }
  } catch (err) {
    console.warn('Could not read TMP_DATA_FILE:', err);
  }

  // 3. Fallback to built-in INITIAL_DATA (Guarantees Vercel & local server never crash)
  return INITIAL_DATA;
}

export function savePortfolioData(data: PortfolioData): boolean {
  ensureDataFile();
  // Try standard path first
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('Standard save failed (likely read-only serverless environment), trying /tmp fallback:', err);
  }

  // Fallback to /tmp on serverless (Vercel)
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Save failed on /tmp fallback:', err);
    return false;
  }
}

export function getContactMessages(): ContactMessage[] {
  ensureDataFile();
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading MESSAGES_FILE, checking TMP:', err);
  }

  try {
    if (fs.existsSync(TMP_MESSAGES_FILE)) {
      const raw = fs.readFileSync(TMP_MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading TMP_MESSAGES_FILE:', err);
  }

  return [];
}

export function saveContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
  ensureDataFile();
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: 'msg-' + Date.now(),
    createdAt: new Date().toISOString(),
    isRead: false
  };
  messages.unshift(newMessage);

  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch {
    try {
      if (!fs.existsSync(TMP_DIR)) {
        fs.mkdirSync(TMP_DIR, { recursive: true });
      }
      fs.writeFileSync(TMP_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save message:', e);
    }
  }

  return newMessage;
}

export function markMessageRead(id: string): boolean {
  ensureDataFile();
  const messages = getContactMessages();
  const target = messages.find(m => m.id === id);
  if (target) {
    target.isRead = true;
    try {
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
      return true;
    } catch {
      try {
        if (!fs.existsSync(TMP_DIR)) {
          fs.mkdirSync(TMP_DIR, { recursive: true });
        }
        fs.writeFileSync(TMP_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
        return true;
      } catch (e) {
        console.error('Failed to mark message read:', e);
      }
    }
  }
  return false;
}
