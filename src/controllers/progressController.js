import { ProgressService } from '../services/progressService.js';
import { ACHIEVEMENTS } from '../constants/curriculumData.js';
import { successResponse } from '../utils/response.js';

export class ProgressController {
  static async getAchievements(req, res, next) {
    try {
      let earnedIds = new Set();
      if (req.user) {
        const userEarned = await ProgressService.getUserAchievements(req.user.id);
        earnedIds = new Set(userEarned.map((a) => a.achievementId || a.id));
      }

      const achievementsList = ACHIEVEMENTS.map((a) => ({
        ...a,
        isEarned: earnedIds.has(a.id),
      }));

      return successResponse(res, { achievements: achievementsList }, 'Achievements retrieved');
    } catch (err) {
      next(err);
    }
  }

  static async getSummary(req, res, next) {
    try {
      const summary = await ProgressService.getUserProgressSummary(req.user.id);
      return successResponse(res, { summary }, 'Progress summary generated');
    } catch (err) {
      next(err);
    }
  }

  static async getRecentActivity(req, res, next) {
    try {
      const activities = await ProgressService.getRecentActivities(req.user.id, 15);
      return successResponse(res, { activities }, 'Recent activity retrieved');
    } catch (err) {
      next(err);
    }
  }

  static async completeWizard(req, res, next) {
    try {
      const awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'pr-apprentice');
      await ProgressService.logActivity(req.user.id, 'wizard_complete', 'first-contribution-wizard');
      return successResponse(
        res,
        { awardedBadge },
        'Congratulations on finishing the First Contribution Wizard!'
      );
    } catch (err) {
      next(err);
    }
  }
}
