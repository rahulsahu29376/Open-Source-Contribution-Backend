import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';
import { supabase, isUsingSupabase, memoryStore } from '../config/database.js';

export class AuthService {
  static sanitizeUser(user) {
    if (!user) return null;
    const { password_hash, passwordHash, ...sanitized } = user;
    return {
      id: sanitized.id,
      fullName: sanitized.full_name || sanitized.fullName,
      email: sanitized.email,
      githubUsername: sanitized.github_username || sanitized.githubUsername || null,
      experienceLevel: sanitized.experience_level || sanitized.experienceLevel || 'beginner',
      preferredLanguages: sanitized.preferred_languages || sanitized.preferredLanguages || [],
      role: sanitized.role || 'user',
      avatarUrl: sanitized.avatar_url || sanitized.avatarUrl || null,
      bio: sanitized.bio || null,
      createdAt: sanitized.created_at || sanitized.createdAt,
    };
  }

  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || 'user',
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );
  }

  static async register({ fullName, email, password, githubUsername, experienceLevel, preferredLanguages }) {
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in Supabase
    if (isUsingSupabase) {
      try {
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', normalizedEmail)
          .single();

        if (checkError && (checkError.code === 'PGRST205' || checkError.message?.includes('schema cache'))) {
          throw checkError; // trigger local fallback
        }

        if (existingUser) {
          const error = new Error('An account with this email address already exists');
          error.statusCode = 409;
          error.code = 'EMAIL_ALREADY_EXISTS';
          throw error;
        }

        // Hash password with bcrypt work factor 12
        const passwordHash = await bcrypt.hash(password, 12);

        const { data: newUser, error: insertError } = await supabase
          .from('profiles')
          .insert({
            full_name: fullName,
            email: normalizedEmail,
            password_hash: passwordHash,
            github_username: githubUsername || null,
            experience_level: experienceLevel || 'beginner',
            preferred_languages: preferredLanguages || [],
            role: 'user',
          })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        const token = this.generateToken(newUser);
        return { token, user: this.sanitizeUser(newUser) };
      } catch (err) {
        if (err.statusCode === 409) throw err;
        // If Supabase table is not yet created, fall through to memoryStore!
      }
    }

    // Memory Store Fallback
    for (const u of memoryStore.users.values()) {
      if (u.email === normalizedEmail) {
        const error = new Error('An account with this email address already exists');
        error.statusCode = 409;
        error.code = 'EMAIL_ALREADY_EXISTS';
        throw error;
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = memoryStore.generateId('user');

    const newUser = {
      id: userId,
      fullName,
      email: normalizedEmail,
      passwordHash,
      githubUsername: githubUsername || null,
      experienceLevel: experienceLevel || 'beginner',
      preferredLanguages: preferredLanguages || [],
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryStore.users.set(userId, newUser);
    const token = this.generateToken(newUser);
    return { token, user: this.sanitizeUser(newUser) };
  }

  static async login({ email, password }) {
    const normalizedEmail = email.toLowerCase().trim();

    let userRecord = null;
    let passwordHash = null;

    if (isUsingSupabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', normalizedEmail)
          .single();

        if (!error && data) {
          userRecord = data;
          passwordHash = data.password_hash;
        }
      } catch {
        // Fallback to local store
      }
    }

    if (!userRecord) {
      for (const u of memoryStore.users.values()) {
        if (u.email === normalizedEmail) {
          userRecord = u;
          passwordHash = u.passwordHash;
          break;
        }
      }

      if (!userRecord) {
        const err = new Error('Invalid email or password');
        err.statusCode = 401;
        err.code = 'INVALID_CREDENTIALS';
        throw err;
      }
    }

    // Secure comparison
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      const err = new Error('Invalid email or password');
      err.statusCode = 401;
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }

    const token = this.generateToken(userRecord);
    return { token, user: this.sanitizeUser(userRecord) };
  }

  static async getCurrentUser(userId) {
    if (isUsingSupabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!error && data) {
          return this.sanitizeUser(data);
        }
      } catch {
        // Fallback to local store
      }
    }

    const user = memoryStore.users.get(userId);
    if (!user) {
      const err = new Error('User account not found');
      err.statusCode = 404;
      err.code = 'USER_NOT_FOUND';
      throw err;
    }
    return this.sanitizeUser(user);
  }

  static async updateProfile(userId, updateFields) {
    if (isUsingSupabase) {
      const updateData = {
        updated_at: new Date().toISOString(),
      };
      if (updateFields.fullName !== undefined) updateData.full_name = updateFields.fullName;
      if (updateFields.githubUsername !== undefined) updateData.github_username = updateFields.githubUsername;
      if (updateFields.experienceLevel !== undefined) updateData.experience_level = updateFields.experienceLevel;
      if (updateFields.preferredLanguages !== undefined) updateData.preferred_languages = updateFields.preferredLanguages;
      if (updateFields.bio !== undefined) updateData.bio = updateFields.bio;

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return this.sanitizeUser(data);
    }

    const user = memoryStore.users.get(userId);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    if (updateFields.fullName !== undefined) user.fullName = updateFields.fullName;
    if (updateFields.githubUsername !== undefined) user.githubUsername = updateFields.githubUsername;
    if (updateFields.experienceLevel !== undefined) user.experienceLevel = updateFields.experienceLevel;
    if (updateFields.preferredLanguages !== undefined) user.preferredLanguages = updateFields.preferredLanguages;
    if (updateFields.bio !== undefined) user.bio = updateFields.bio;
    user.updatedAt = new Date().toISOString();

    return this.sanitizeUser(user);
  }

  static async changePassword(userId, { currentPassword, newPassword }) {
    let currentHash = null;
    let user = null;

    if (isUsingSupabase) {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!data) throw new Error('User not found');
      user = data;
      currentHash = data.password_hash;
    } else {
      user = memoryStore.users.get(userId);
      if (!user) throw new Error('User not found');
      currentHash = user.passwordHash;
    }

    const isMatch = await bcrypt.compare(currentPassword, currentHash);
    if (!isMatch) {
      const err = new Error('Current password is incorrect');
      err.statusCode = 400;
      err.code = 'INVALID_CURRENT_PASSWORD';
      throw err;
    }

    const newHash = await bcrypt.hash(newPassword, 12);

    if (isUsingSupabase) {
      await supabase.from('profiles').update({ password_hash: newHash, updated_at: new Date().toISOString() }).eq('id', userId);
    } else {
      user.passwordHash = newHash;
      user.updatedAt = new Date().toISOString();
    }

    return true;
  }
}
