import { PortfolioData, ContactMessage } from './types';
import { INITIAL_DATA, hashPassword } from './initialData';
import { db as firebaseDb } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc } from 'firebase/firestore';

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

// In-memory cache for fast reads
let memoryCache: PortfolioData | null = null;
let messagesCache: ContactMessage[] | null = null;

// Safe filesystem initialization
function ensureDataFile() {
  const fs = getFs();
  if (!fs) return;

  const dataDir = getDataDir();
  const dataFile = getDataFile();
  const messagesFile = getMessagesFile();

  try {
    if (!fs.existsSync(dataDir)) {
      try { fs.mkdirSync(dataDir, { recursive: true }); } catch {}
    }
    if (!fs.existsSync(dataFile)) {
      try { fs.writeFileSync(dataFile, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8'); } catch {}
    }
    if (!fs.existsSync(messagesFile)) {
      try { fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8'); } catch {}
    }
  } catch (err) {
    console.warn('Filesystem init warning:', err);
  }
}

// Async getter: Tries Firestore first, falls back to local JSON file/INITIAL_DATA
export async function getPortfolioDataAsync(): Promise<PortfolioData> {
  try {
    if (firebaseDb) {
      const docRef = doc(firebaseDb, 'portfolio', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const firestoreData = docSnap.data() as PortfolioData;
        const merged = {
          ...INITIAL_DATA,
          ...firestoreData,
          profile: { ...INITIAL_DATA.profile, ...(firestoreData.profile || {}) },
          siteSettings: { ...INITIAL_DATA.siteSettings, ...(firestoreData.siteSettings || {}) },
          skills: firestoreData.skills?.length ? firestoreData.skills : INITIAL_DATA.skills,
          projects: firestoreData.projects?.length ? firestoreData.projects : INITIAL_DATA.projects,
          awards: firestoreData.awards?.length ? firestoreData.awards : (INITIAL_DATA.awards || []),
          certifications: firestoreData.certifications?.length ? firestoreData.certifications : INITIAL_DATA.certifications,
          experience: firestoreData.experience?.length ? firestoreData.experience : INITIAL_DATA.experience,
        };
        memoryCache = merged;
        return merged;
      } else {
        // First time initialization: seed Firestore with INITIAL_DATA
        await setDoc(docRef, INITIAL_DATA);
        memoryCache = INITIAL_DATA;
        return INITIAL_DATA;
      }
    }
  } catch (err) {
    console.warn('Firestore fetch failed, falling back to local storage:', err);
  }

  return getPortfolioData();
}

// Sync fallback getter
export function getPortfolioData(): PortfolioData {
  if (memoryCache) return memoryCache;

  ensureDataFile();
  const fs = getFs();
  if (!fs) return INITIAL_DATA;

  const dataFile = getDataFile();
  const tmpDataFile = getTmpDataFile();

  try {
    if (dataFile && fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf-8');
      const data = JSON.parse(raw);
      const merged = {
        ...INITIAL_DATA,
        ...data,
        profile: { ...INITIAL_DATA.profile, ...(data.profile || {}) },
        siteSettings: { ...INITIAL_DATA.siteSettings, ...(data.siteSettings || {}) }
      };
      memoryCache = merged;
      return merged;
    }
  } catch (err) {
    console.warn('Error reading dataFile:', err);
  }

  try {
    if (tmpDataFile && fs.existsSync(tmpDataFile)) {
      const raw = fs.readFileSync(tmpDataFile, 'utf-8');
      const data = JSON.parse(raw);
      const merged = {
        ...INITIAL_DATA,
        ...data,
        profile: { ...INITIAL_DATA.profile, ...(data.profile || {}) },
        siteSettings: { ...INITIAL_DATA.siteSettings, ...(data.siteSettings || {}) }
      };
      memoryCache = merged;
      return merged;
    }
  } catch (err) {
    console.warn('Error reading tmpDataFile:', err);
  }

  memoryCache = INITIAL_DATA;
  return INITIAL_DATA;
}

// Async saver: Saves to Firestore & syncs to local filesystem / memory cache
export async function savePortfolioDataAsync(data: PortfolioData): Promise<boolean> {
  memoryCache = data;
  let firestoreSuccess = false;

  try {
    if (firebaseDb) {
      const docRef = doc(firebaseDb, 'portfolio', 'main');
      await setDoc(docRef, data, { merge: true });
      firestoreSuccess = true;
    }
  } catch (err) {
    console.error('Firestore save failed:', err);
  }

  const localSuccess = savePortfolioData(data);
  return firestoreSuccess || localSuccess;
}

// Sync local saver
export function savePortfolioData(data: PortfolioData): boolean {
  memoryCache = data;
  ensureDataFile();
  const fs = getFs();
  if (!fs) return false;

  const dataFile = getDataFile();
  const tmpDir = getTmpDir();
  const tmpDataFile = getTmpDataFile();

  try {
    if (dataFile) {
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    }
  } catch (err) {
    console.warn('Standard save failed, trying /tmp:', err);
  }

  try {
    if (tmpDir && !fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    if (tmpDataFile) {
      fs.writeFileSync(tmpDataFile, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    }
  } catch (err) {
    console.error('Failed to save to /tmp:', err);
  }
  return false;
}

export function getContactMessages(): ContactMessage[] {
  if (messagesCache) return messagesCache;

  ensureDataFile();
  const fs = getFs();
  if (!fs) return [];

  const messagesFile = getMessagesFile();
  const tmpMessagesFile = getTmpMessagesFile();

  try {
    if (messagesFile && fs.existsSync(messagesFile)) {
      const raw = fs.readFileSync(messagesFile, 'utf-8');
      messagesCache = JSON.parse(raw);
      return messagesCache || [];
    }
  } catch (err) {
    console.warn('Error reading MESSAGES_FILE:', err);
  }

  try {
    if (tmpMessagesFile && fs.existsSync(tmpMessagesFile)) {
      const raw = fs.readFileSync(tmpMessagesFile, 'utf-8');
      messagesCache = JSON.parse(raw);
      return messagesCache || [];
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
  messagesCache = messages;

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
    messagesCache = messages;
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
