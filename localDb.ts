import { User, ScanResult, FarmerAlert, FieldNote, FarmerReminder } from '../types';

const DB_NAME = 'AgriScanOfflineDB_v1';
const DB_VERSION = 1;

class LocalDatabase {
  private db: IDBDatabase | null = null;
  private isInitializing: Promise<IDBDatabase> | null = null;

  public async getDb(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    if (this.isInitializing) return this.isInitializing;

    this.isInitializing = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }
        if (!db.objectStoreNames.contains('scans')) {
          const scanStore = db.createObjectStore('scans', { keyPath: 'id' });
          scanStore.createIndex('userId', 'userId', { unique: false });
          scanStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        if (!db.objectStoreNames.contains('alerts')) {
          db.createObjectStore('alerts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('reminders')) {
          db.createObjectStore('reminders', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });

    return this.isInitializing;
  }

  // --- Users Operations ---
  public async saveUser(user: User): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const req = store.put(user);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const index = store.index('email');
      const req = index.get(email.trim().toLowerCase());
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  public async getUserById(id: string): Promise<User | null> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  public async getAllUsers(): Promise<User[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  // --- Scans Operations ---
  public async saveScan(scan: ScanResult): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('scans', 'readwrite');
      const store = tx.objectStore('scans');
      const req = store.put(scan);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async getScansByUser(userId: string): Promise<ScanResult[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('scans', 'readonly');
      const store = tx.objectStore('scans');
      const req = store.getAll();
      req.onsuccess = () => {
        const all: ScanResult[] = req.result || [];
        const filtered = all
          .filter((s) => s.userId === userId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        resolve(filtered);
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async deleteScan(id: string): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('scans', 'readwrite');
      const store = tx.objectStore('scans');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- Alerts Operations ---
  public async getAlerts(): Promise<FarmerAlert[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('alerts', 'readonly');
      const store = tx.objectStore('alerts');
      const req = store.getAll();
      req.onsuccess = () => {
        const items: FarmerAlert[] = req.result || [];
        resolve(items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async saveAlert(alert: FarmerAlert): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('alerts', 'readwrite');
      const store = tx.objectStore('alerts');
      const req = store.put(alert);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async markAlertsRead(): Promise<void> {
    const alerts = await this.getAlerts();
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('alerts', 'readwrite');
      const store = tx.objectStore('alerts');
      alerts.forEach((a) => {
        store.put({ ...a, read: true });
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // --- Field Notes Operations ---
  public async getNotes(): Promise<FieldNote[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('notes', 'readonly');
      const store = tx.objectStore('notes');
      const req = store.getAll();
      req.onsuccess = () => {
        const items: FieldNote[] = req.result || [];
        resolve(items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async saveNote(note: FieldNote): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('notes', 'readwrite');
      const store = tx.objectStore('notes');
      const req = store.put(note);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async deleteNote(id: string): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('notes', 'readwrite');
      const store = tx.objectStore('notes');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- Farmer Reminders Operations ---
  public async getReminders(): Promise<FarmerReminder[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('reminders', 'readonly');
      const store = tx.objectStore('reminders');
      const req = store.getAll();
      req.onsuccess = () => {
        const items: FarmerReminder[] = req.result || [];
        resolve(items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
      };
      req.onerror = () => reject(req.error);
    });
  }

  public async saveReminder(reminder: FarmerReminder): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('reminders', 'readwrite');
      const store = tx.objectStore('reminders');
      const req = store.put(reminder);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  public async deleteReminder(id: string): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('reminders', 'readwrite');
      const store = tx.objectStore('reminders');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export const localDb = new LocalDatabase();
