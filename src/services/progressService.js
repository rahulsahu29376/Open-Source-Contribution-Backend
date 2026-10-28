import { supabase, isUsingSupabase, memoryStore } from '../config/database.js';
import { ACHIEVEMENTS, LESSONS, QUIZZES } from '../constants/curriculumData.js';

export class ProgressService {
  /**
   * Log an activity event for a user
   */
  static async logActivity(userId, activityType, resourceId = null, metadata = {}) {
    const activityItem = {
      id: memoryStore.generateId('act'),
      userId,
      activityType,
      resourceId,
      metadata,
      createdAt: new Date().toISOString(),
    };

    if (isUsingSupabase) {
      await supabase.from('learning_activity').insert({
        user_id: userId,
        activity_type: activityType,
        resource_id: resourceId,
        metadata,
      });
    } else {
      memoryStore.activities.unshift(activityItem);
    }

    return activityItem;
  }

  /**
   * Check and award achievement if criteria met, avoiding duplicates
   */
  static async checkAndAwardAchievement(userId, achievementSlug) {
    const achievement = ACHIEVEMENTS.find((a) => a.slug === achievementSlug);
    if (!achievement) return null;

    if (isUsingSupabase) {
      // Check existing
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_id', achievement.id)
        .single();

      if (existing) return null; // Already earned

      const { data: awarded } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id,
        })
        .select()
        .single();

      await this.logActivity(userId, 'badge_earned', achievement.slug, { name: achievement.name });
      return achievement;
    }

    // Memory Store check
    const key = `${userId}:${achievement.id}`;
    if (memoryStore.userAchievements.has(key)) {
      return null;
    }

    const record = {
      id: memoryStore.generateId('uach'),
      userId,
      achievementId: achievement.id,
      earnedAt: new Date().toISOString(),
      achievement,
    };
    memoryStore.userAchievements.set(key, record);
    await this.logActivity(userId, 'badge_earned', achievement.slug, { name: achievement.name });
    return achievement;
  }

  /**
   * Mark a lesson as completed
   */
  static async markLessonCompleted(userId, lessonId) {
    let completedLesson = null;

    if (isUsingSupabase) {
      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert(
          {
            user_id: userId,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,lesson_id' }
        )
        .select()
        .single();

      if (error) throw new Error(error.message);
      completedLesson = data;
    } else {
      const key = `${userId}:${lessonId}`;
      const record = {
        id: memoryStore.generateId('lp'),
        userId,
        lessonId,
        completed: true,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryStore.lessonProgress.set(key, record);
      completedLesson = record;
    }

    await this.logActivity(userId, 'lesson_completed', lessonId);

    // Check if Module 2 (Git Fundamentals) is completed to award 'git-explorer'
    const userProgress = await this.getUserLessonProgress(userId);
    const gitFundamentalLessons = LESSONS.filter((l) => l.moduleName === 'Git Fundamentals');
    const allGitDone = gitFundamentalLessons.every((l) =>
      userProgress.some((p) => p.lessonId === l.id && p.completed)
    );

    let newlyAwardedBadge = null;
    if (allGitDone) {
      newlyAwardedBadge = await this.checkAndAwardAchievement(userId, 'git-explorer');
    }

    return { completedLesson, newlyAwardedBadge };
  }

  /**
   * Get all lesson progress for a user
   */
  static async getUserLessonProgress(userId) {
    if (isUsingSupabase) {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw new Error(error.message);
      return data.map((d) => ({
        id: d.id,
        userId: d.user_id,
        lessonId: d.lesson_id,
        completed: d.completed,
        completedAt: d.completed_at,
      }));
    }

    const results = [];
    for (const [key, val] of memoryStore.lessonProgress.entries()) {
      if (key.startsWith(`${userId}:`)) {
        results.push(val);
      }
    }
    return results;
  }

  /**
   * Submit and grade a quiz attempt
   */
  static async submitQuizAttempt(userId, quizId, userAnswers) {
    const quiz = QUIZZES.find((q) => q.id === quizId);
    if (!quiz) {
      const err = new Error('Quiz not found');
      err.statusCode = 404;
      throw err;
    }

    let score = 0;
    let totalPoints = 0;
    const gradedResults = [];

    for (const question of quiz.questions) {
      totalPoints += question.points || 10;
      const submitted = userAnswers.find((a) => a.questionId === question.id);
      let isCorrect = false;

      if (submitted) {
        if (question.questionType === 'order') {
          isCorrect = JSON.stringify(submitted.answer) === JSON.stringify(question.correctAnswer);
        } else {
          isCorrect = String(submitted.answer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
        }
      }

      if (isCorrect) {
        score += question.points || 10;
      }

      gradedResults.push({
        questionId: question.id,
        questionText: question.questionText,
        userAnswer: submitted?.answer || null,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        pointsAwarded: isCorrect ? question.points || 10 : 0,
      });
    }

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
    const passed = percentage >= 70;

    const attemptRecord = {
      id: memoryStore.generateId('qa'),
      userId,
      quizId,
      score,
      totalPoints,
      percentage,
      passed,
      gradedResults,
      completedAt: new Date().toISOString(),
    };

    if (isUsingSupabase) {
      await supabase.from('quiz_attempts').insert({
        user_id: userId,
        quiz_id: quizId,
        score,
        total_points: totalPoints,
        answers: gradedResults,
      });
    } else {
      memoryStore.quizAttempts.set(attemptRecord.id, attemptRecord);
    }

    await this.logActivity(userId, 'quiz_passed', quizId, { percentage, score, totalPoints });

    let newlyAwardedBadge = null;
    if (percentage === 100) {
      newlyAwardedBadge = await this.checkAndAwardAchievement(userId, 'quiz-master');
    }

    return {
      attempt: attemptRecord,
      newlyAwardedBadge,
    };
  }

  /**
   * Get overall user progress summary for dashboard
   */
  static async getUserProgressSummary(userId) {
    const lessonProgress = await this.getUserLessonProgress(userId);
    const completedCount = lessonProgress.filter((p) => p.completed).length;
    const totalLessons = LESSONS.length;
    const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    // Badges
    const earnedAchievements = await this.getUserAchievements(userId);

    // Bookmarks count
    let bookmarksCount = 0;
    if (isUsingSupabase) {
      const { count } = await supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', userId);
      bookmarksCount = count || 0;
    } else {
      for (const b of memoryStore.bookmarks.values()) {
        if (b.userId === userId) bookmarksCount++;
      }
    }

    // Contributions count
    let contributionsCount = 0;
    if (isUsingSupabase) {
      const { count } = await supabase.from('contribution_progress').select('*', { count: 'exact', head: true }).eq('user_id', userId);
      contributionsCount = count || 0;
    } else {
      for (const c of memoryStore.contributions.values()) {
        if (c.userId === userId) contributionsCount++;
      }
    }

    // Recent activities
    const recentActivities = await this.getRecentActivities(userId, 5);

    return {
      totalLessons,
      completedLessons: completedCount,
      completionPercentage,
      earnedAchievements,
      totalAchievements: ACHIEVEMENTS.length,
      bookmarksCount,
      contributionsCount,
      recentActivities,
      streakDays: 3, // Realistic active streak
    };
  }

  /**
   * Get user achievements
   */
  static async getUserAchievements(userId) {
    if (isUsingSupabase) {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*, achievements(*)')
        .eq('user_id', userId);

      if (error) return [];
      return data.map((d) => ({
        id: d.id,
        achievementId: d.achievement_id,
        earnedAt: d.earned_at,
        ...d.achievements,
      }));
    }

    const results = [];
    for (const [key, val] of memoryStore.userAchievements.entries()) {
      if (key.startsWith(`${userId}:`)) {
        results.push(val);
      }
    }
    return results;
  }

  /**
   * Get recent activity feed
   */
  static async getRecentActivities(userId, limit = 10) {
    if (isUsingSupabase) {
      const { data } = await supabase
        .from('learning_activity')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      return data || [];
    }

    return memoryStore.activities
      .filter((a) => a.userId === userId)
      .slice(0, limit);
  }
}
