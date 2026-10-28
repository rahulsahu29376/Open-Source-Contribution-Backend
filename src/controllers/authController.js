import { AuthService } from '../services/authService.js';
import { successResponse } from '../utils/response.js';

export class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      return successResponse(res, result, 'Registration successful. Welcome to Open-Source Beginner Guide!', 201);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      return successResponse(res, result, 'Login successful. Welcome back!');
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res) {
    // Stateless JWT logout - frontend clears the token
    return successResponse(res, null, 'Logged out successfully');
  }

  static async getCurrentUser(req, res, next) {
    try {
      const user = await AuthService.getCurrentUser(req.user.id);
      return successResponse(res, { user }, 'User profile fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const user = await AuthService.updateProfile(req.user.id, req.body);
      return successResponse(res, { user }, 'Profile updated successfully');
    } catch (err) {
      next(err);
    }
  }

  static async changePassword(req, res, next) {
    try {
      await AuthService.changePassword(req.user.id, req.body);
      return successResponse(res, null, 'Password updated successfully');
    } catch (err) {
      next(err);
    }
  }
}
