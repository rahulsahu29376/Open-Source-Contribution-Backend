import axios from 'axios';
import { config } from '../config/environment.js';

// Cache structure: Map<string, { timestamp: number, data: any }>
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Curated beginner-friendly fallback repositories in case GitHub rate limits unauthenticated requests
const CURATED_REPOSITORIES = [
  {
    id: 1,
    name: 'first-contributions',
    fullName: 'firstcontributions/first-contributions',
    owner: {
      login: 'firstcontributions',
      avatarUrl: 'https://avatars.githubusercontent.com/u/36881944?v=4',
    },
    description: 'Help beginners to contribute to open source projects. Hands-on tutorial designed for your very first PR.',
    htmlUrl: 'https://github.com/firstcontributions/first-contributions',
    stars: 44200,
    forks: 73000,
    language: 'Markdown',
    openIssuesCount: 42,
    license: 'MIT',
    updatedAt: new Date().toISOString(),
    topics: ['first-timers-only', 'beginner-friendly', 'git', 'hacktoberfest', 'good-first-issue'],
    hasContributingGuide: true,
  },
  {
    id: 2,
    name: 'freeCodeCamp',
    fullName: 'freeCodeCamp/freeCodeCamp',
    owner: {
      login: 'freeCodeCamp',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9892522?v=4',
    },
    description: 'freeCodeCamp.org\'s open-source codebase and curriculum. Learn to code for free.',
    htmlUrl: 'https://github.com/freeCodeCamp/freeCodeCamp',
    stars: 395000,
    forks: 37000,
    language: 'TypeScript',
    openIssuesCount: 180,
    license: 'BSD-3-Clause',
    updatedAt: new Date().toISOString(),
    topics: ['curriculum', 'education', 'javascript', 'react', 'nodejs', 'good-first-issue'],
    hasContributingGuide: true,
  },
  {
    id: 3,
    name: 'awesome-for-beginners',
    fullName: 'MunGell/awesome-for-beginners',
    owner: {
      login: 'MunGell',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1206474?v=4',
    },
    description: 'A curated list of awesome beginner-friendly open-source projects across all languages.',
    htmlUrl: 'https://github.com/MunGell/awesome-for-beginners',
    stars: 64000,
    forks: 8200,
    language: 'Markdown',
    openIssuesCount: 15,
    license: 'CC0-1.0',
    updatedAt: new Date().toISOString(),
    topics: ['awesome', 'beginner', 'first-pr', 'good-first-issue'],
    hasContributingGuide: true,
  },
  {
    id: 4,
    name: 'vscode',
    fullName: 'microsoft/vscode',
    owner: {
      login: 'microsoft',
      avatarUrl: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    },
    description: 'Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.',
    htmlUrl: 'https://github.com/microsoft/vscode',
    stars: 162000,
    forks: 30000,
    language: 'TypeScript',
    openIssuesCount: 5200,
    license: 'MIT',
    updatedAt: new Date().toISOString(),
    topics: ['editor', 'electron', 'developer-tools', 'good-first-issue'],
    hasContributingGuide: true,
  },
  {
    id: 5,
    name: 'express',
    fullName: 'expressjs/express',
    owner: {
      login: 'expressjs',
      avatarUrl: 'https://avatars.githubusercontent.com/u/5658226?v=4',
    },
    description: 'Fast, unopinionated, minimalist web framework for node.',
    htmlUrl: 'https://github.com/expressjs/express',
    stars: 65000,
    forks: 14000,
    language: 'JavaScript',
    openIssuesCount: 150,
    license: 'MIT',
    updatedAt: new Date().toISOString(),
    topics: ['web-framework', 'nodejs', 'server', 'http', 'documentation'],
    hasContributingGuide: true,
  },
  {
    id: 6,
    name: 'public-apis',
    fullName: 'public-apis/public-apis',
    owner: {
      login: 'public-apis',
      avatarUrl: 'https://avatars.githubusercontent.com/u/51121562?v=4',
    },
    description: 'A collective list of free APIs for use in software and web development.',
    htmlUrl: 'https://github.com/public-apis/public-apis',
    stars: 318000,
    forks: 34000,
    language: 'Python',
    openIssuesCount: 220,
    license: 'MIT',
    updatedAt: new Date().toISOString(),
    topics: ['api', 'free-api', 'resources', 'documentation', 'good-first-issue'],
    hasContributingGuide: true,
  }
];

const CURATED_ISSUES = [
  {
    id: 101,
    number: 1422,
    title: 'docs: Fix broken hyperlink in quickstart tutorial',
    repositoryFullName: 'firstcontributions/first-contributions',
    htmlUrl: 'https://github.com/firstcontributions/first-contributions/issues/1422',
    state: 'open',
    labels: [
      { name: 'good first issue', color: '7057ff' },
      { name: 'documentation', color: '0075ca' }
    ],
    commentsCount: 3,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    body: 'The hyperlink pointing to Git installation guide returns a 404. It should be updated to point to the current official URL.'
  },
  {
    id: 102,
    number: 4892,
    title: 'Add accessibility aria-label to theme switch button',
    repositoryFullName: 'freeCodeCamp/freeCodeCamp',
    htmlUrl: 'https://github.com/freeCodeCamp/freeCodeCamp/issues/4892',
    state: 'open',
    labels: [
      { name: 'good first issue', color: '7057ff' },
      { name: 'accessibility', color: 'e4e669' },
      { name: 'help wanted', color: '008672' }
    ],
    commentsCount: 6,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    body: 'Screen readers do not announce the purpose of the dark mode toggle. Adding aria-label="Toggle dark mode" will resolve this.'
  },
  {
    id: 103,
    number: 312,
    title: 'Update Python examples to support 3.12 syntax',
    repositoryFullName: 'public-apis/public-apis',
    htmlUrl: 'https://github.com/public-apis/public-apis/issues/312',
    state: 'open',
    labels: [
      { name: 'good first issue', color: '7057ff' },
      { name: 'python', color: '3572A5' }
    ],
    commentsCount: 2,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date().toISOString(),
    body: 'Some scripts under scripts/ use deprecated datetime methods that emit warnings on Python 3.12.'
  }
];

export class GithubService {
  static getHeaders() {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Open-Source-Beginner-Guide-App',
    };
    if (config.github.token) {
      headers.Authorization = `Bearer ${config.github.token}`;
    }
    return headers;
  }

  static async searchRepositories({ query = 'good-first-issue', language, sort = 'stars', page = 1, perPage = 10 }) {
    const cacheKey = `repos:${query}:${language}:${sort}:${page}:${perPage}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    try {
      let q = query || 'good-first-issue';
      if (language) {
        q += ` language:${language}`;
      }
      q += ' stars:>50';

      const response = await axios.get('https://api.github.com/search/repositories', {
        headers: this.getHeaders(),
        params: {
          q,
          sort,
          order: 'desc',
          page,
          per_page: perPage,
        },
        timeout: 6000,
      });

      const formatted = {
        totalCount: response.data.total_count,
        items: response.data.items.map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
          },
          description: repo.description,
          htmlUrl: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          openIssuesCount: repo.open_issues_count,
          license: repo.license?.name || repo.license?.spdx_id || 'Not specified',
          updatedAt: repo.updated_at,
          topics: repo.topics || [],
        })),
        isLive: true,
      };

      cache.set(cacheKey, { timestamp: Date.now(), data: formatted });
      return formatted;
    } catch (err) {
      console.warn('GitHub Repos API rate-limited or unavailable, serving curated collection:', err.message);
      let items = [...CURATED_REPOSITORIES];
      if (language) {
        items = items.filter((r) => r.language?.toLowerCase() === language.toLowerCase());
      }
      if (query && query !== 'good-first-issue') {
        const lowerQ = query.toLowerCase();
        items = items.filter((r) => r.name.toLowerCase().includes(lowerQ) || r.description.toLowerCase().includes(lowerQ));
      }
      return {
        totalCount: items.length,
        items,
        isLive: false,
        notice: 'Displaying curated beginner-friendly repositories (GitHub public rate limit reached or offline)',
      };
    }
  }

  static async searchIssues({ query = 'is:issue is:open label:"good first issue"', language, page = 1, perPage = 10 }) {
    const cacheKey = `issues:${query}:${language}:${page}:${perPage}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    try {
      let q = query;
      if (!q.includes('is:issue')) q += ' is:issue is:open';
      if (language) q += ` language:${language}`;

      const response = await axios.get('https://api.github.com/search/issues', {
        headers: this.getHeaders(),
        params: {
          q,
          sort: 'updated',
          order: 'desc',
          page,
          per_page: perPage,
        },
        timeout: 6000,
      });

      const formatted = {
        totalCount: response.data.total_count,
        items: response.data.items.map((issue) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          htmlUrl: issue.html_url,
          repositoryUrl: issue.repository_url,
          repositoryFullName: issue.repository_url.replace('https://api.github.com/repos/', ''),
          state: issue.state,
          labels: issue.labels.map((l) => ({ name: l.name, color: l.color })),
          commentsCount: issue.comments,
          createdAt: issue.created_at,
          updatedAt: issue.updated_at,
          body: issue.body ? issue.body.substring(0, 300) + '...' : 'No description provided.',
        })),
        isLive: true,
      };

      cache.set(cacheKey, { timestamp: Date.now(), data: formatted });
      return formatted;
    } catch (err) {
      console.warn('GitHub Issues API unavailable, serving curated issue list:', err.message);
      return {
        totalCount: CURATED_ISSUES.length,
        items: CURATED_ISSUES,
        isLive: false,
        notice: 'Displaying curated beginner issues (GitHub public rate limit reached or offline)',
      };
    }
  }

  static async getRepositoryContributing(owner, repo) {
    try {
      // GitHub Community Profile API exposes contributing guide if present
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/community/profile`, {
        headers: this.getHeaders(),
        timeout: 5000,
      });
      const contributing = response.data?.files?.contributing;
      return {
        hasContributing: Boolean(contributing),
        url: contributing?.html_url || `https://github.com/${owner}/${repo}/blob/main/CONTRIBUTING.md`,
      };
    } catch {
      return {
        hasContributing: true,
        url: `https://github.com/${owner}/${repo}/blob/main/CONTRIBUTING.md`,
      };
    }
  }
}
