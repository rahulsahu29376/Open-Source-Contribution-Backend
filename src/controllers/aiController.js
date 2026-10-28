import { AiService } from '../services/aiService.js';
import { successResponse } from '../utils/response.js';

export class AiController {
  static async explainCommand(req, res, next) {
    try {
      const result = await AiService.explainCommand(req.body);
      return successResponse(res, result, 'Command explained successfully');
    } catch (err) {
      next(err);
    }
  }

  static async explainError(req, res, next) {
    try {
      const result = await AiService.explainError(req.body);
      return successResponse(res, result, 'Error explanation and recovery steps generated');
    } catch (err) {
      next(err);
    }
  }

  static async generateLearningPlan(req, res, next) {
    try {
      const result = await AiService.generateLearningPlan(req.body);
      return successResponse(res, result, 'Personalized open-source learning roadmap created');
    } catch (err) {
      next(err);
    }
  }
}
