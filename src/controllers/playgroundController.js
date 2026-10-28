import { PLAYGROUND_CHALLENGES } from '../constants/curriculumData.js';
import { ProgressService } from '../services/progressService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export class PlaygroundController {
  static async getChallenges(req, res) {
    return successResponse(res, { challenges: PLAYGROUND_CHALLENGES }, 'Playground challenges retrieved successfully');
  }

  static async getChallengeById(req, res) {
    const { id } = req.params;
    const challenge = PLAYGROUND_CHALLENGES.find((c) => c.id === id);
    if (!challenge) {
      return errorResponse(res, 'Challenge not found', 404, 'CHALLENGE_NOT_FOUND');
    }
    return successResponse(res, { challenge }, 'Challenge retrieved successfully');
  }

  static async attemptChallenge(req, res, next) {
    try {
      const { id } = req.params;
      const { finalRepoState, completedCommands } = req.body;
      const challenge = PLAYGROUND_CHALLENGES.find((c) => c.id === id);

      if (!challenge) {
        return errorResponse(res, 'Challenge not found', 404, 'CHALLENGE_NOT_FOUND');
      }

      // Check validation rule
      let passed = false;
      const rule = challenge.validationRule;

      if (rule.type === 'initialized') {
        passed = finalRepoState?.initialized === true;
      } else if (rule.type === 'commit_count') {
        passed = (finalRepoState?.commits?.length || 0) >= (rule.minCommits || 1);
      } else if (rule.type === 'current_branch') {
        passed = finalRepoState?.currentBranch === rule.branch;
      } else if (rule.type === 'merged_branch') {
        passed = (finalRepoState?.mergedBranches || []).includes(rule.branch);
      }

      let awardedBadge = null;
      if (passed && req.user) {
        if (id === 'ch-2') awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'first-commit');
        if (id === 'ch-3') awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'branch-builder');
        if (id === 'ch-4') awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'merge-learner');

        await ProgressService.logActivity(req.user.id, 'playground_challenge', id, { title: challenge.title });
      }

      return successResponse(
        res,
        {
          challengeId: id,
          passed,
          awardedBadge,
          message: passed ? 'Congratulations! Challenge completed successfully.' : 'Validation incomplete. Review the hint and try again.',
        },
        passed ? 'Challenge passed!' : 'Challenge requirements not yet met.'
      );
    } catch (err) {
      next(err);
    }
  }
}
