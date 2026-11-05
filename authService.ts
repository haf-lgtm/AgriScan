import { User, Language } from '../types';
import { localDb } from './localDb';

const CURRENT_USER_KEY = 'agriscan_current_user_v1';
const REMEMBER_ME_KEY = 'agriscan_remember_me_v1';

export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function initializeDefaultUser(): Promise<User> {
  const existingUsers = await localDb.getAllUsers();
  if (existingUsers.length > 0) {
    return existingUsers[0];
  }

  // Seed default demonstration farmer user
  const defaultPasswordHash = await hashPassword('farmer123');
  const demoFarmer: User = {
    id: 'user_farmer_demo',
    fullName: 'Ramesh Patel',
    email: 'farmer@agriscan.org',
    phone: '+91 98450 12345',
    passwordHash: defaultPasswordHash,
    state: 'Karnataka',
    district: 'Dharwad',
    preferredLanguage: 'en',
    mainCrop: 'Tomato',
    createdAt: new Date().toISOString(),
  };

  await localDb.saveUser(demoFarmer);
  return demoFarmer;
}

export async function loginUser(emailOrUsername: string, passwordPlain: string, remember: boolean): Promise<{ success: boolean; user?: User; error?: string }> {
  await initializeDefaultUser();
  const emailClean = emailOrUsername.trim().toLowerCase();
  let user = await localDb.getUserByEmail(emailClean);

  if (!user) {
    // Check if entered as phone or username
    const allUsers = await localDb.getAllUsers();
    user = allUsers.find((u) => u.phone === emailClean || u.fullName.toLowerCase() === emailClean) || null;
  }

  if (!user) {
    return { success: false, error: 'User profile not found. Please register or check credentials.' };
  }

  const hash = await hashPassword(passwordPlain);
  if (user.passwordHash !== hash) {
    return { success: false, error: 'Incorrect password entered. Please try again.' };
  }

  // Set session
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  if (remember) {
    localStorage.setItem(REMEMBER_ME_KEY, user.email);
  } else {
    localStorage.removeItem(REMEMBER_ME_KEY);
  }

  return { success: true, user };
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  state: string;
  district: string;
  preferredLanguage: Language;
  mainCrop: string;
}): Promise<{ success: boolean; user?: User; error?: string }> {
  const emailClean = data.email.trim().toLowerCase();
  const existing = await localDb.getUserByEmail(emailClean);
  if (existing) {
    return { success: false, error: 'A farmer profile with this email already exists on this device.' };
  }

  const passwordHash = await hashPassword(data.password);
  const newUser: User = {
    id: 'user_' + Date.now().toString(36),
    fullName: data.fullName.trim(),
    email: emailClean,
    phone: data.phone.trim(),
    passwordHash,
    state: data.state.trim(),
    district: data.district.trim(),
    preferredLanguage: data.preferredLanguage,
    mainCrop: data.mainCrop,
    createdAt: new Date().toISOString(),
  };

  await localDb.saveUser(newUser);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return { success: true, user: newUser };
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getRememberedEmail(): string {
  return localStorage.getItem(REMEMBER_ME_KEY) || '';
}
