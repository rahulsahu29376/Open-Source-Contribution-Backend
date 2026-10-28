import { LESSONS, MODULES } from '../constants/curriculumData.js';
import { ProgressService } from '../services/progressService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export class LessonController {
  static async getModules(req, res) {
    return successResponse(res, { modules: MODULES }, 'Modules retrieved successfully');
  }

  static async getLessons(req, res) {
    const { module, difficulty } = req.query;
    let lessons = [...LESSONS];

    if (module) {
      lessons = lessons.filter((l) => l.moduleName.toLowerCase() === module.toLowerCase());
    }
    if (difficulty) {
      lessons = lessons.filter((l) => l.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    // Attach completed status if user is authenticated
    if (req.user) {
      const userProgress = await ProgressService.getUserLessonProgress(req.user.id);
      lessons = lessons.map((l) => {
        const prog = userProgress.find((p) => p.lessonId === l.id);
        return {
          ...l,
          completed: prog ? prog.completed : false,
        };
      });
    }

    return successResponse(res, { lessons, total: lessons.length }, 'Lessons retrieved successfully');
  }

  static async getLessonBySlug(req, res) {
    const { slug } = req.params;
    const lesson = LESSONS.find((l) => l.slug === slug);

    if (!lesson) {
      return errorResponse(res, `Lesson with slug '${slug}' not found`, 404, 'LESSON_NOT_FOUND');
    }

    let completed = false;
    if (req.user) {
      const userProgress = await ProgressService.getUserLessonProgress(req.user.id);
      const prog = userProgress.find((p) => p.lessonId === lesson.id);
      completed = prog ? prog.completed : false;
    }

    // Find next and previous lessons
    const currentIndex = LESSONS.findIndex((l) => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? { slug: LESSONS[currentIndex - 1].slug, title: LESSONS[currentIndex - 1].title } : null;
    const nextLesson = currentIndex < LESSONS.length - 1 ? { slug: LESSONS[currentIndex + 1].slug, title: LESSONS[currentIndex + 1].title } : null;

    return successResponse(res, { lesson: { ...lesson, completed }, prevLesson, nextLesson }, 'Lesson retrieved successfully');
  }

  static async markLessonComplete(req, res, next) {
    try {
      const { id } = req.params;
      const lesson = LESSONS.find((l) => l.id === id);
      if (!lesson) {
        return errorResponse(res, 'Lesson not found', 404, 'LESSON_NOT_FOUND');
      }

      const result = await ProgressService.markLessonCompleted(req.user.id, id);
      return successResponse(res, result, 'Lesson marked as completed! Progress updated.');
    } catch (err) {
      next(err);
    }
  }

  static async getUserProgress(req, res, next) {
    try {
      const progress = await ProgressService.getUserLessonProgress(req.user.id);
      return successResponse(res, { progress }, 'User progress fetched successfully');
    } catch (err) {
      next(err);
    }
  }
}
