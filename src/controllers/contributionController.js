import { successResponse, errorResponse } from '../utils/response.js';
import { supabase, isUsingSupabase, memoryStore } from '../config/database.js';
import { ProgressService } from '../services/progressService.js';

export class ContributionController {
  static async getContributions(req, res, next) {
    try {
      let contributions = [];
      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('contribution_progress')
          .select('*')
          .eq('user_id', req.user.id)
          .order('updated_at', { ascending: false });

        if (error) throw new Error(error.message);
        contributions = data;
      } else {
        contributions = Array.from(memoryStore.contributions.values())
          .filter((c) => c.userId === req.user.id)
          .reverse();
      }

      return successResponse(res, { contributions }, 'Contributions fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async logContribution(req, res, next) {
    try {
      const { repositoryUrl, issueUrl, pullRequestUrl, status, notes } = req.body;
      let newContribution = null;

      if (isUsingSupabase) {
        const { data, error } = await supabase
          .from('contribution_progress')
          .insert({
            user_id: req.user.id,
            repository_url: repositoryUrl,
            issue_url: issueUrl || null,
            pull_request_url: pullRequestUrl || null,
            status: status || 'planned',
            notes: notes || null,
          })
          .select()
          .single();

        if (error) throw new Error(error.message);
        newContribution = data;
      } else {
        const id = memoryStore.generateId('contrib');
        newContribution = {
          id,
          userId: req.user.id,
          repositoryUrl,
          issueUrl: issueUrl || null,
          pullRequestUrl: pullRequestUrl || null,
          status: status || 'planned',
          notes: notes || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        memoryStore.contributions.set(id, newContribution);
      }

      // Check for 'open-source-contributor' badge if user logged a submitted PR
      let awardedBadge = null;
      if (status === 'submitted' || status === 'merged') {
        awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'open-source-contributor');
      }

      await ProgressService.logActivity(req.user.id, 'contribution_logged', newContribution.id, {
        status: newContribution.status,
        repositoryUrl,
      });

      return successResponse(res, { contribution: newContribution, awardedBadge }, 'Contribution tracked successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  static async updateContribution(req, res, next) {
    try {
      const { id } = req.params;
      const { status, pullRequestUrl, issueUrl, notes } = req.body;
      let updated = null;

      if (isUsingSupabase) {
        const updateData = { updated_at: new Date().toISOString() };
        if (status) updateData.status = status;
        if (pullRequestUrl !== undefined) updateData.pull_request_url = pullRequestUrl;
        if (issueUrl !== undefined) updateData.issue_url = issueUrl;
        if (notes !== undefined) updateData.notes = notes;

        const { data, error } = await supabase
          .from('contribution_progress')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', req.user.id)
          .select()
          .single();

        if (error) throw new Error(error.message);
        updated = data;
      } else {
        const existing = memoryStore.contributions.get(id);
        if (!existing || existing.userId !== req.user.id) {
          return errorResponse(res, 'Contribution entry not found', 404, 'NOT_FOUND');
        }
        if (status) existing.status = status;
        if (pullRequestUrl !== undefined) existing.pullRequestUrl = pullRequestUrl;
        if (issueUrl !== undefined) existing.issueUrl = issueUrl;
        if (notes !== undefined) existing.notes = notes;
        existing.updatedAt = new Date().toISOString();
        updated = existing;
      }

      let awardedBadge = null;
      if (status === 'merged') {
        awardedBadge = await ProgressService.checkAndAwardAchievement(req.user.id, 'open-source-contributor');
      }

      return successResponse(res, { contribution: updated, awardedBadge }, 'Contribution progress updated');
    } catch (err) {
      next(err);
    }
  }

  static async deleteContribution(req, res, next) {
    try {
      const { id } = req.params;

      if (isUsingSupabase) {
        const { error } = await supabase
          .from('contribution_progress')
          .delete()
          .eq('id', id)
          .eq('user_id', req.user.id);

        if (error) throw new Error(error.message);
      } else {
        const existing = memoryStore.contributions.get(id);
        if (existing && existing.userId === req.user.id) {
          memoryStore.contributions.delete(id);
        }
      }

      return successResponse(res, null, 'Contribution deleted');
    } catch (err) {
      next(err);
    }
  }
}
