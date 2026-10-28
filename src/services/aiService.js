import { config } from '../config/environment.js';

export class AiService {
  /**
   * Explain a Git command in simple beginner terms
   */
  static async explainCommand({ command, context }) {
    const trimmed = (command || '').trim().toLowerCase();

    // Built-in intelligent heuristic explanations
    const knowledgeBase = {
      'git init': {
        summary: 'Initializes a new, empty Git repository in your current directory.',
        breakdown: [
          'Creates a hidden `.git` folder containing version history and database.',
          'Turns regular folder into a tracked repository.',
        ],
        example: 'git init',
        proTip: 'Only run this once at the root of your project.',
      },
      'git status': {
        summary: 'Inspects the working tree and staging area.',
        breakdown: [
          'Shows untracked, modified, and staged files.',
          'Shows current branch and whether your branch is ahead/behind remote.',
        ],
        example: 'git status',
        proTip: 'Run this before and after every git command to avoid surprises.',
      },
      'git add': {
        summary: 'Copies modified and new files to the Staging Area (Index).',
        breakdown: [
          '`git add <file>` stages a single file.',
          '`git add .` stages all changes in current folder.',
        ],
        example: 'git add src/App.jsx',
        proTip: 'Use `git status` after staging to verify what you added.',
      },
      'git commit': {
        summary: 'Creates a permanent snapshot of staged files with a descriptive log message.',
        breakdown: [
          '`-m "message"` sets the commit description inline.',
          'Each commit receives a unique SHA hash ID.',
        ],
        example: 'git commit -m "feat: add user authentication"',
        proTip: 'Write commit messages in imperative mood: "Fix bug", not "Fixed bug".',
      },
      'git switch': {
        summary: 'Navigates between different branches in your repository.',
        breakdown: [
          '`git switch <name>` switches to an existing branch.',
          '`git switch -c <name>` creates and switches to a new branch.',
        ],
        example: 'git switch -c docs/update-readme',
        proTip: 'Always switch to a feature branch before editing code.',
      },
      'git diff': {
        summary: 'Shows line-by-line differences between files.',
        breakdown: [
          'Green lines with `+` are additions.',
          'Red lines with `-` are deletions.',
          '`git diff --staged` shows staged differences.',
        ],
        example: 'git diff',
        proTip: 'Review your diff before committing to ensure no unintended files or secrets are added.',
      },
      'git merge': {
        summary: 'Integrates changes from a specified branch into your current branch.',
        breakdown: [
          'Takes commit history from source branch and joins it with current branch.',
          'May trigger a merge conflict if the same lines were altered differently.',
        ],
        example: 'git switch main && git merge feat/search-bar',
        proTip: 'Ensure tests pass on your feature branch before merging into main.',
      },
      'git pull': {
        summary: 'Downloads updates from a remote repository and merges them into your local branch.',
        breakdown: [
          'Shorthand for `git fetch` + `git merge`.',
          'Keeps your local code synchronized with team members.',
        ],
        example: 'git pull origin main',
        proTip: 'Commit or stash your local work before pulling to avoid conflicts.',
      },
      'git push': {
        summary: 'Uploads your committed local branch changes to a remote repository (like GitHub).',
        breakdown: [
          '`origin` is the remote server.',
          '`-u` flag tracks the branch for convenient subsequent pushes.',
        ],
        example: 'git push -u origin feat/my-branch',
        proTip: 'Never use `git push --force` on shared production branches.',
      },
    };

    // Find closest match in knowledge base
    for (const [key, val] of Object.entries(knowledgeBase)) {
      if (trimmed.startsWith(key)) {
        return {
          command,
          explanation: val.summary,
          breakdown: val.breakdown,
          example: val.example,
          proTip: val.proTip,
          source: 'Open-Source Learning Engine',
        };
      }
    }

    return {
      command,
      explanation: `The command \`${command}\` is used in Git workflows to manipulate version control state.`,
      breakdown: [
        'Run `git --help` or `man ' + command.split(' ')[0] + '` in your terminal for manual details.',
        'Always verify with `git status` before and after running repository operations.',
      ],
      example: command,
      proTip: 'Test unfamiliar commands inside our interactive Git Playground first!',
      source: 'Open-Source Learning Engine',
    };
  }

  /**
   * Explain common Git error messages and recommend step-by-step resolution
   */
  static async explainError({ errorMessage, context }) {
    const msg = (errorMessage || '').toLowerCase();

    if (msg.includes('fatal: not a git repository')) {
      return {
        error: errorMessage,
        meaning: 'You are running a Git command in a folder that has not been initialized with Git.',
        fixSteps: [
          '1. Verify your current directory with `pwd` (or `cd` in Windows).',
          '2. If you want to track this folder, run `git init`.',
          '3. If you cloned a repo, check if you forgot to `cd <folder-name>`.',
        ],
        safeRecovery: 'Running `git init` is completely safe and creates a fresh repository.',
      };
    }

    if (msg.includes('refusing to merge unrelated histories')) {
      return {
        error: errorMessage,
        meaning: 'Git is trying to merge two repositories that do not share a common root commit (e.g. creating a local repo and pulling an existing GitHub repo with a README).',
        fixSteps: [
          '1. Ensure you actually intended to merge these two repositories.',
          '2. If yes, run: `git pull origin main --allow-unrelated-histories`',
          '3. Resolve any file conflicts that appear and commit.',
        ],
        safeRecovery: 'Use `--allow-unrelated-histories` only when merging initial READMEs or setup files.',
      };
    }

    if (msg.includes('updates were rejected because the remote contains work') || msg.includes('non-fast-forward')) {
      return {
        error: errorMessage,
        meaning: 'Someone else pushed changes to the remote branch that you do not yet have locally.',
        fixSteps: [
          '1. Fetch and merge remote changes first: `git pull origin <branch-name>`',
          '2. Test your code locally to ensure everything works.',
          '3. Re-run your push: `git push origin <branch-name>`',
        ],
        safeRecovery: 'Do NOT run `git push -f`! Always pull first.',
      };
    }

    if (msg.includes('automatic merge failed; fix conflicts and then commit the result')) {
      return {
        error: errorMessage,
        meaning: 'Both branches modified the exact same lines of code. Git needs you to choose which code to keep.',
        fixSteps: [
          '1. Run `git status` to identify conflicting files.',
          '2. Open each file in your editor and look for `<<<<<<< HEAD` markers.',
          '3. Choose the correct code and delete the markers.',
          '4. Stage the resolved files with `git add <file>`.',
          '5. Finish the merge with `git commit`.',
        ],
        safeRecovery: 'If you feel stuck, abort the merge safely with `git merge --abort`.',
      };
    }

    return {
      error: errorMessage,
      meaning: 'Git encountered an unexpected repository state or parameter issue.',
      fixSteps: [
        '1. Check repository state with `git status`.',
        '2. Verify remote configuration with `git remote -v`.',
        '3. Inspect recent commit operations with `git log -n 5`.',
      ],
      safeRecovery: 'Avoid running destructive commands like `git reset --hard` before checking `git status`.',
    };
  }

  /**
   * Generate customized learning plan
   */
  static async generateLearningPlan({ experienceLevel = 'beginner', targetLanguage = 'JavaScript', weeklyHours = 5 }) {
    const plan = {
      profile: { experienceLevel, targetLanguage, weeklyHours },
      totalWeeks: 4,
      weeks: [
        {
          week: 1,
          theme: 'Git & Command-Line Foundations',
          timeEstimateHours: weeklyHours,
          modules: ['Introduction to Open Source', 'Git Fundamentals'],
          actionItems: [
            'Complete Lesson 1 & 2 on open-source culture and licenses.',
            'Practice git init, git add, and git commit in the Git Playground.',
            'Score 80%+ on Git Fundamentals assessment.',
          ],
        },
        {
          week: 2,
          theme: 'Branching, Collaboration & GitHub Remotes',
          timeEstimateHours: weeklyHours,
          modules: ['GitHub Basics', 'Branches and Merging'],
          actionItems: [
            'Create and switch between feature branches in Playground.',
            'Complete merge challenge and understand conflict resolution.',
            'Configure your GitHub username and email in Git.',
          ],
        },
        {
          week: 3,
          theme: 'Finding Beginner Issues & Open Source Etiquette',
          timeEstimateHours: weeklyHours,
          modules: ['Issues and Project Communication', 'Forks and Pull Requests'],
          actionItems: [
            'Use Project Explorer to filter for ' + targetLanguage + ' projects with `good-first-issue` labels.',
            'Read 3 real CONTRIBUTING.md guidelines.',
            'Bookmark 2 accessible issues to investigate.',
          ],
        },
        {
          week: 4,
          theme: 'Your First Pull Request',
          timeEstimateHours: weeklyHours,
          modules: ['First Contribution Wizard', 'Common Problems and Recovery'],
          actionItems: [
            'Follow the 10-step First Contribution Wizard.',
            'Fork a chosen repository, create a branch, and craft a focused commit.',
            'Open your first pull request and track it on your dashboard!',
          ],
        },
      ],
    };

    return plan;
  }
}
