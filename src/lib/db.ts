import { PortfolioData, ContactMessage } from './types';
import { INITIAL_DATA, hashPassword } from './initialData';

export { INITIAL_DATA, hashPassword };

// Node.js server-side modules loaded safely
const getFs = () => (typeof window === 'undefined' ? require('fs') : null);
const getPath = () => (typeof window === 'undefined' ? require('path') : null);

function getDataDir(): string {
  const path = getPath();
  return path ? path.join(process.cwd(), 'data') : '';
}

function getDataFile(): string {
  const path = getPath();
  return path ? path.join(getDataDir(), 'portfolio.json') : '';
}

function getMessagesFile(): string {
  const path = getPath();
  return path ? path.join(getDataDir(), 'messages.json') : '';
}

function getTmpDir(): string {
  const path = getPath();
  return path ? path.join('/tmp', 'data') : '';
}

function getTmpDataFile(): string {
  const path = getPath();
  return path ? path.join(getTmpDir(), 'portfolio.json') : '';
}

function getTmpMessagesFile(): string {
  const path = getPath();
  return path ? path.join(getTmpDir(), 'messages.json') : '';
}

// Safe directory initialization that never throws
function ensureDataFile() {
  const fs = getFs();
  if (!fs) return;

  const dataDir = getDataDir();
  const dataFile = getDataFile();
  const messagesFile = getMessagesFile();

  try {
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {
        // Ignored on serverless read-only FS
      }
    }
    if (!fs.existsSync(dataFile)) {
      try {
        fs.writeFileSync(dataFile, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      } catch {
        // Ignored on serverless read-only FS
      }
    }
    if (!fs.existsSync(messagesFile)) {
      try {
        fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8');
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
  const fs = getFs();
  if (!fs) return INITIAL_DATA;

  const dataFile = getDataFile();
  const tmpDataFile = getTmpDataFile();

  // 1. Try reading from process.cwd()/data/portfolio.json
  try {
    if (dataFile && fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf-8');
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
    if (tmpDataFile && fs.existsSync(tmpDataFile)) {
      const raw = fs.readFileSync(tmpDataFile, 'utf-8');
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
  const fs = getFs();
  if (!fs) return false;

  const dataFile = getDataFile();
  const tmpDir = getTmpDir();
  const tmpDataFile = getTmpDataFile();

  // Try standard path first
  try {
    if (dataFile) {
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    }
  } catch (err) {
    console.warn('Standard save failed (likely read-only serverless environment), trying /tmp fallback:', err);
  }

  // Fallback to /tmp on serverless (Vercel)
  try {
    if (tmpDir && !fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    if (tmpDataFile) {
      fs.writeFileSync(tmpDataFile, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    }
  } catch (err) {
    console.error('Save failed on /tmp fallback:', err);
  }
  return false;
}

export function getContactMessages(): ContactMessage[] {
  ensureDataFile();
  const fs = getFs();
  if (!fs) return [];

  const messagesFile = getMessagesFile();
  const tmpMessagesFile = getTmpMessagesFile();

  try {
    if (messagesFile && fs.existsSync(messagesFile)) {
      const raw = fs.readFileSync(messagesFile, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading MESSAGES_FILE, checking TMP:', err);
  }

  try {
    if (tmpMessagesFile && fs.existsSync(tmpMessagesFile)) {
      const raw = fs.readFileSync(tmpMessagesFile, 'utf-8');
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

  const fs = getFs();
  if (fs) {
    const messagesFile = getMessagesFile();
    const tmpDir = getTmpDir();
    const tmpMessagesFile = getTmpMessagesFile();

    try {
      if (messagesFile) fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    } catch {
      try {
        if (tmpDir && !fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
        if (tmpMessagesFile) fs.writeFileSync(tmpMessagesFile, JSON.stringify(messages, null, 2), 'utf-8');
      } catch (e) {
        console.error('Failed to save message:', e);
      }
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
    const fs = getFs();
    if (fs) {
      const messagesFile = getMessagesFile();
      const tmpDir = getTmpDir();
      const tmpMessagesFile = getTmpMessagesFile();

      try {
        if (messagesFile) fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
        return true;
      } catch {
        try {
          if (tmpDir && !fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
          }
          if (tmpMessagesFile) fs.writeFileSync(tmpMessagesFile, JSON.stringify(messages, null, 2), 'utf-8');
          return true;
        } catch (e) {
          console.error('Failed to mark message read:', e);
        }
      }
    }
  }
  return false;
}
