import { QUIZZES } from '../constants/curriculumData.js';
import { ProgressService } from '../services/progressService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { memoryStore, isUsingSupabase, supabase } from '../config/database.js';

export class QuizController {
  static async getQuizzes(req, res) {
    // Return sanitized quiz summaries
    const summaries = QUIZZES.map((q) => ({
      id: q.id,
      moduleName: q.moduleName,
      title: q.title,
      description: q.description,
      questionCount: q.questions.length,
      totalPoints: q.questions.reduce((sum, item) => sum + (item.points || 10), 0),
    }));

    return successResponse(res, { quizzes: summaries }, 'Quizzes retrieved successfully');
  }

  static async getQuizById(req, res) {
    const { id } = req.params;
    const quiz = QUIZZES.find((q) => q.id === id);

    if (!quiz) {
      return errorResponse(res, 'Quiz not found', 404, 'QUIZ_NOT_FOUND');
    }

    // Never return correctAnswer to client before submission!
    const sanitizedQuestions = quiz.questions.map((q) => ({
      id: q.id,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options,
      points: q.points,
      orderIndex: q.orderIndex,
    }));

    return successResponse(
      res,
      {
        quiz: {
          id: quiz.id,
          moduleName: quiz.moduleName,
          title: quiz.title,
          description: quiz.description,
          questions: sanitizedQuestions,
        },
      },
      'Quiz fetched successfully'
    );
  }

  static async submitQuizAttempt(req, res, next) {
    try {
      const { id } = req.params;
      const { answers } = req.body;

      const result = await ProgressService.submitQuizAttempt(req.user.id, id, answers);
      return successResponse(res, result, 'Quiz submitted and graded successfully!');
    } catch (err) {
      next(err);
    }
  }

  static async getQuizAttempts(req, res, next) {
    try {
      const { id } = req.params;
      let attempts = [];

      if (isUsingSupabase) {
        const { data } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('user_id', req.user.id)
          .eq('quiz_id', id)
          .order('completed_at', { ascending: false });
        attempts = data || [];
      } else {
        attempts = Array.from(memoryStore.quizAttempts.values())
          .filter((a) => a.userId === req.user.id && a.quizId === id)
          .reverse();
      }

      return successResponse(res, { attempts }, 'Quiz attempts retrieved successfully');
    } catch (err) {
      next(err);
    }
  }
}
