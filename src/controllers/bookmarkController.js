import { successResponse, errorResponse } from '../utils/response.js';
import { supabase, isUsingSupabase, memoryStore } from '../config/database.js';
import { ProgressService } from '../services/progressService.js';

export class BookmarkController {
  static async getBookmarks(req, res, next) {
    try {
      let bookmarks = [];
      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', req.user.id)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        bookmarks = data;
      } else {
        bookmarks = Array.from(memoryStore.bookmarks.values())
          .filter((b) => b.userId === req.user.id)
          .reverse();
      }

      return successResponse(res, { bookmarks }, 'Bookmarks fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async createBookmark(req, res, next) {
    try {
      const { resourceType, resourceId, title, metadata } = req.body;
      let newBookmark = null;

      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: req.user.id,
            resource_type: resourceType,
            resource_id: resourceId,
            title,
            metadata: metadata || {},
          })
          .select()
          .single();

        if (error) throw new Error(error.message);
        newBookmark = data;
      } else {
        const id = memoryStore.generateId('bm');
        newBookmark = {
          id,
          userId: req.user.id,
          resourceType,
          resourceId,
          title,
          metadata: metadata || {},
          createdAt: new Date().toISOString(),
        };
        memoryStore.bookmarks.set(id, newBookmark);
      }

      // Check for 'issue-detective' badge if an issue is bookmarked
      let awardedBadge = null;
      if (resourceType === 'issue') {
        awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'issue-detective');
      }

      return successResponse(res, { bookmark: newBookmark, awardedBadge }, 'Bookmark saved successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;

      if (isUsingSupabase) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('id', id)
          .eq('user_id', req.user.id);

        if (error) throw new Error(error.message);
      } else {
        const existing = memoryStore.bookmarks.get(id);
        if (existing && existing.userId === req.user.id) {
          memoryStore.bookmarks.delete(id);
        }
      }

      return successResponse(res, null, 'Bookmark removed successfully');
    } catch (err) {
      next(err);
    }
  }
}
