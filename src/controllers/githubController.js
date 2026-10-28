import { GithubService } from '../services/githubService.js';
import { successResponse } from '../utils/response.js';

export class GithubController {
  static async searchRepositories(req, res, next) {
    try {
      const { q, language, sort, page, perPage } = req.query;
      const data = await GithubService.searchRepositories({
        query: q,
        language,
        sort,
        page: page ? parseInt(page, 10) : 1,
        perPage: perPage ? parseInt(perPage, 10) : 10,
      });

      return successResponse(res, data, 'Repositories fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async searchIssues(req, res, next) {
    try {
      const { q, language, page, perPage } = req.query;
      const data = await GithubService.searchIssues({
        query: q,
        language,
        page: page ? parseInt(page, 10) : 1,
        perPage: perPage ? parseInt(perPage, 10) : 10,
      });

      return successResponse(res, data, 'Issues fetched successfully');
    } catch (err) {
      next(err);
    }
  }

  static async getContributingGuide(req, res, next) {
    try {
      const { owner, repo } = req.params;
      const data = await GithubService.getRepositoryContributing(owner, repo);
      return successResponse(res, data, 'Contributing guide link retrieved');
    } catch (err) {
      next(err);
    }
  }
}
