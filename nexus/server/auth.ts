import bcrypt from 'bcrypt';
import { storage } from './storage';

const SALT_ROUNDS = 12;

/**
 * Hash password using bcrypt with salt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Create user with hashed password
 */
export async function createUserWithHashedPassword(userData: {
  username: string;
  password: string;
  email: string;
}) {
  const hashedPassword = await hashPassword(userData.password);
  
  return await storage.createUser({
    ...userData,
    password: hashedPassword
  });
}

/**
 * Authenticate user with password
 */
export async function authenticateUser(username: string, password: string) {
  const user = await storage.getUserByUsername(username);
  
  if (!user) {
    return null;
  }
  
  const isValidPassword = await verifyPassword(password, user.password);
  
  if (!isValidPassword) {
    return null;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Force password reset for existing users (migration helper)
 */
export async function migrateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);
  await storage.updateUserPassword(userId, hashedPassword);
  console.log(`Password migrated successfully for user ${userId}`);
}