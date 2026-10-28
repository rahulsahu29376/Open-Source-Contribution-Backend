import { successResponse, errorResponse } from '../utils/response.js';
import { supabase, isUsingSupabase, memoryStore } from '../config/database.js';

export class ProjectController {
  static async getSavedProjects(req, res, next) {
    try {
      let projects = [];
      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('saved_projects')
          .select('*')
          .eq('user_id', req.user.id)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        projects = data;
      } else {
        projects = Array.from(memoryStore.savedProjects.values())
          .filter((p) => p.userId === req.user.id)
          .reverse();
      }

      return successResponse(res, { projects }, 'Saved projects retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static async saveProject(req, res, next) {
    try {
      const { repositoryFullName, repositoryUrl, notes, metadata } = req.body;
      let saved = null;

      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('saved_projects')
          .insert({
            user_id: req.user.id,
            repository_full_name: repositoryFullName,
            repository_url: repositoryUrl,
            notes: notes || null,
            metadata: metadata || {},
          })
          .select()
          .single();

        if (error) throw new Error(error.message);
        saved = data;
      } else {
        const id = memoryStore.generateId('proj');
        saved = {
          id,
          userId: req.user.id,
          repositoryFullName,
          repositoryUrl,
          notes: notes || null,
          metadata: metadata || {},
          createdAt: new Date().toISOString(),
        };
        memoryStore.savedProjects.set(id, saved);
      }

      return successResponse(res, { project: saved }, 'Project saved to your dashboard', 201);
    } catch (err) {
      next(err);
    }
  }

  static async deleteSavedProject(req, res, next) {
    try {
      const { id } = req.params;

      if (isUsingSupabase) {
        const { error } = await supabase
          .from('saved_projects')
          .delete()
          .eq('id', id)
          .eq('user_id', req.user.id);

        if (error) throw new Error(error.message);
      } else {
        const existing = memoryStore.savedProjects.get(id);
        if (existing && existing.userId === req.user.id) {
          memoryStore.savedProjects.delete(id);
        }
      }

      return successResponse(res, null, 'Saved project removed successfully');
    } catch (err) {
      next(err);
    }
  }
}
