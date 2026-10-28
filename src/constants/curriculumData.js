/**
 * Open-Source Beginner Guide - Curriculum, Quizzes, Challenges, and Badges Data
 */

export const ACHIEVEMENTS = [
  {
    id: 'ach-1',
    slug: 'git-explorer',
    name: 'Git Explorer',
    description: 'Began your journey into version control by completing the Git Fundamentals module.',
    icon: 'Compass',
    criteria: { type: 'module_complete', module: 'Git Fundamentals' },
  },
  {
    id: 'ach-2',
    slug: 'first-commit',
    name: 'First Commit',
    description: 'Staged and committed your first set of changes in the Git Playground.',
    icon: 'GitCommit',
    criteria: { type: 'playground_action', action: 'commit' },
  },
  {
    id: 'ach-3',
    slug: 'branch-builder',
    name: 'Branch Builder',
    description: 'Created and switched between isolated feature branches.',
    icon: 'GitBranch',
    criteria: { type: 'playground_action', action: 'branch' },
  },
  {
    id: 'ach-4',
    slug: 'merge-learner',
    name: 'Merge Learner',
    description: 'Successfully merged a feature branch and verified repository history.',
    icon: 'GitMerge',
    criteria: { type: 'playground_action', action: 'merge' },
  },
  {
    id: 'ach-5',
    slug: 'issue-detective',
    name: 'Issue Detective',
    description: 'Explored real repositories and bookmarked a beginner-friendly issue.',
    icon: 'Search',
    criteria: { type: 'bookmark_created', resourceType: 'issue' },
  },
  {
    id: 'ach-6',
    slug: 'pr-apprentice',
    name: 'Pull Request Apprentice',
    description: 'Walked through all 10 steps of the First Contribution Wizard.',
    icon: 'GitPullRequest',
    criteria: { type: 'wizard_complete' },
  },
  {
    id: 'ach-7',
    slug: 'quiz-master',
    name: 'Quiz Master',
    description: 'Scored 100% on any module quiz assessment.',
    icon: 'Award',
    criteria: { type: 'quiz_perfect_score' },
  },
  {
    id: 'ach-8',
    slug: 'open-source-contributor',
    name: 'Open-Source Contributor',
    description: 'Logged and submitted your first real-world open-source pull request.',
    icon: 'Sparkles',
    criteria: { type: 'contribution_logged' },
  },
];

export const MODULES = [
  {
    id: 'mod-1',
    slug: 'introduction-to-open-source',
    title: 'Module 1: Introduction to Open Source',
    description: 'Understand what open-source software is, why people collaborate, licensing basics, and how to read project repositories.',
    icon: 'BookOpen',
    orderIndex: 1,
  },
  {
    id: 'mod-2',
    slug: 'git-fundamentals',
    title: 'Module 2: Git Fundamentals',
    description: 'Master version control concepts: repositories, working directories, staging areas, commits, and inspecting history.',
    icon: 'Terminal',
    orderIndex: 2,
  },
  {
    id: 'mod-3',
    slug: 'github-basics',
    title: 'Module 3: GitHub Basics',
    description: 'Learn remote repositories, cloning, pushing, pulling, and working with GitHub securely.',
    icon: 'Github',
    orderIndex: 3,
  },
  {
    id: 'mod-4',
    slug: 'branches-and-merging',
    title: 'Module 4: Branches and Merging',
    description: 'Isolate changes using feature branches, merge changes cleanly, and understand merge conflict resolution.',
    icon: 'GitBranch',
    orderIndex: 4,
  },
  {
    id: 'mod-5',
    slug: 'issues-and-project-communication',
    title: 'Module 5: Issues and Project Communication',
    description: 'Discover how to find issues, interpret labels like good-first-issue, and communicate respectfully with maintainers.',
    icon: 'MessageSquare',
    orderIndex: 5,
  },
  {
    id: 'mod-6',
    slug: 'forks-and-pull-requests',
    title: 'Module 6: Forks and Pull Requests',
    description: 'The golden open-source workflow: fork, clone, branch, edit, test, commit, push, and open an exceptional PR.',
    icon: 'GitPullRequest',
    orderIndex: 6,
  },
  {
    id: 'mod-7',
    slug: 'common-problems-and-recovery',
    title: 'Module 7: Common Problems and Recovery',
    description: 'Safe troubleshooting: un-staging files, amending commits, handling detached HEAD, and recovering from mistakes.',
    icon: 'ShieldAlert',
    orderIndex: 7,
  },
];

export const LESSONS = [
  // Module 1
  {
    id: 'les-1',
    slug: 'what-is-open-source',
    moduleName: 'Introduction to Open Source',
    title: 'What is Open Source Software?',
    description: 'Explore the foundations of open-source software, collaborative culture, and software licenses.',
    difficulty: 'beginner',
    orderIndex: 1,
    content: {
      learningObjective: 'Understand what open-source software is, why developers contribute, and how open-source licenses grant permissions.',
      explanation: `Open-source software (OSS) is computer software with its source code made publicly accessible under a license that grants users the right to study, change, and distribute the software to anyone for any purpose.

Unlike proprietary software—where the source code is kept secret by a company—open-source projects are built in public. Real-world tools you likely use every day, including Linux, Git, VS Code, React, Python, and Firefox, are all open-source.

### Why Do People Contribute?
1. **Learn & Grow**: Working on real-world codebases with experienced maintainers is one of the fastest ways to accelerate your programming skills.
2. **Fix Problems**: When a library you use has a bug or lacks a feature you need, you can fix it and benefit everyone.
3. **Build Reputation**: Public contributions serve as a transparent portfolio showing how you write code, test, and collaborate.
4. **Community**: Connect with developers around the globe who share your interests.`,
      keyTerms: [
        { term: 'Source Code', definition: 'The human-readable code written by programmers before compilation.' },
        { term: 'Open Source License', definition: 'A legal document declaring how others may use, modify, and distribute the software.' },
        { term: 'Maintainer', definition: 'The person or team responsible for organizing, reviewing, and releasing a project.' },
        { term: 'Contributor', definition: 'Anyone who submits code, documentation, bug reports, or translations to a project.' },
      ],
      codeExample: {
        language: 'text',
        code: `Open Source Licenses Comparison:
├── Permissive (MIT, Apache 2.0, BSD)
│   └── Anyone can use, modify, and distribute, even in proprietary products.
└── Copyleft (GPL, AGPL)
    └── Anyone can modify, but derivative works must also stay open-source.`,
        explanation: 'Always check the LICENSE file in a repository to know what you can and cannot do.'
      },
      commonMistakes: [
        'Assuming public code on GitHub is automatically open source (without a valid license, default copyright applies).',
        'Thinking open-source is only for expert developers; documentation, typos, and tests are critical contributions!'
      ],
      exercise: {
        prompt: 'Check your knowledge: Does hosting code publicly on GitHub mean anyone can reuse it without restrictions?',
        hint: 'Think about whether an explicit open-source license is required.'
      }
    }
  },
  {
    id: 'les-2',
    slug: 'reading-a-repository',
    moduleName: 'Introduction to Open Source',
    title: 'How to Read an Open-Source Repository',
    description: 'Learn how to navigate repository files like README, CONTRIBUTING, LICENSE, and CODE_OF_CONDUCT.',
    difficulty: 'beginner',
    orderIndex: 2,
    content: {
      learningObjective: 'Quickly find critical project information by identifying and reading core repository documents.',
      explanation: `When you land on a new GitHub repository, the file tree can feel overwhelming. Fortunately, established open-source projects follow standard file conventions.

### The Essential Files:
- **README.md**: The front door. Explains what the project does, prerequisites, installation, and basic usage.
- **CONTRIBUTING.md**: The contributor handbook. Details how to set up the dev environment, coding style, branch naming, and pull request procedures.
- **LICENSE**: The legal framework defining permissions and obligations.
- **CODE_OF_CONDUCT.md**: Guidelines outlining expected community behavior, harassment policies, and reporting procedures.
- **.github/ folder**: Contains issue templates, pull request templates, and automated CI/CD workflows.`,
      keyTerms: [
        { term: 'README.md', definition: 'The main introductory markdown document shown on the repository home page.' },
        { term: 'CONTRIBUTING.md', definition: 'Guidelines written by maintainers detailing how to submit changes.' },
        { term: 'Code of Conduct', definition: 'Rules defining respectful community standards and reporting mechanisms.' },
      ],
      codeExample: {
        language: 'markdown',
        code: `# Project Name
A brief description of what this project accomplishes.

## Getting Started
\`\`\`bash
npm install
npm test
\`\`\`

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests!`,
        explanation: 'A great README provides clear setup steps and links to contributing guides.'
      },
      commonMistakes: [
        'Submitting a Pull Request without reading CONTRIBUTING.md first—maintainers may reject it if it violates guidelines.',
        'Ignoring existing issue discussions and opening duplicate tickets.'
      ],
      exercise: {
        prompt: 'Where would you look to see the exact branch naming convention required by a project?',
        hint: 'Look for the contributor guideline file.'
      }
    }
  },

  // Module 2
  {
    id: 'les-3',
    slug: 'git-introduction-and-setup',
    moduleName: 'Git Fundamentals',
    title: 'Git Introduction & First-Time Setup',
    description: 'Understand what Git is, how it differs from GitHub, and configure your identity.',
    difficulty: 'beginner',
    orderIndex: 1,
    content: {
      learningObjective: 'Install and configure Git with your name and email on your local machine.',
      explanation: `**Git** is a distributed version control system. It tracks changes in your files over time, allowing you to recall specific versions later, experiment safely, and collaborate without overwriting teammates' work.

**Git vs. GitHub**:
- **Git** is the local tool running on your computer.
- **GitHub** is a cloud hosting platform that stores Git repositories online and provides collaboration tools like Issues and Pull Requests.

Before creating your first commit, Git needs to know who you are so your commits are attributed properly.`,
      keyTerms: [
        { term: 'Version Control', definition: 'A system that records changes to a file or set of files over time.' },
        { term: 'Git', definition: 'The command-line distributed version control system.' },
        { term: 'Global Config', definition: 'Settings applied across all Git repositories on your computer.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# 1. Check your installed Git version
git --version

# 2. Configure your full name
git config --global user.name "Alex Rivera"

# 3. Configure your email (use your GitHub email)
git config --global user.email "alex@example.com"

# 4. Verify your settings
git config --list`,
        explanation: 'These settings are written once into your ~/.gitconfig file.'
      },
      commonMistakes: [
        'Using a different email address than your GitHub account, which causes commits not to link to your GitHub profile.',
        'Typing user.name with single dashes instead of double dashes.'
      ],
      exercise: {
        prompt: 'Run `git config --list` in your terminal to verify your name and email are configured properly.',
        hint: 'You can test this command in our interactive Git Playground!'
      }
    }
  },
  {
    id: 'les-4',
    slug: 'repository-basics-and-staging',
    moduleName: 'Git Fundamentals',
    title: 'Repository Basics, Staging & Commits',
    description: 'Master the three Git states: Working Directory, Staging Area, and Git Directory (Repository).',
    difficulty: 'beginner',
    orderIndex: 2,
    content: {
      learningObjective: 'Initialize a Git repository, stage files with git add, and create meaningful commits with git commit.',
      explanation: `Git thinks of your files in three distinct areas:
1. **Working Directory**: The actual files you see and edit on your disk.
2. **Staging Area (Index)**: A staging ground where you select and prepare exact changes you want to include in your next snapshot.
3. **Repository (.git directory)**: Where Git permanently stores snapshots (commits) in its database.

This two-step process (Stage -> Commit) lets you craft focused, clean commits rather than committing everything blindly.`,
      keyTerms: [
        { term: 'Working Directory', definition: 'Your sandbox with unmodified, modified, and untracked files.' },
        { term: 'Staging Area', definition: 'The staging index containing files queued for the next commit.' },
        { term: 'Commit', definition: 'An immutable snapshot of your staged files along with author, date, and message.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# 1. Initialize a new Git repository
git init

# 2. Check the status of your files
git status

# 3. Stage a specific file
git add README.md

# 4. Or stage all modified & untracked files
git add .

# 5. Commit staged changes with a descriptive message
git commit -m "docs: add initial project README"`,
        explanation: 'git status is your best friend—run it frequently to see what files are staged or untracked.'
      },
      commonMistakes: [
        'Using vague commit messages like "fix" or "changes" instead of concise, descriptive summaries.',
        'Forgetting to run `git add` before `git commit`, resulting in "nothing to commit, working tree clean".'
      ],
      exercise: {
        prompt: 'What command shows which files have been modified but are not yet staged?',
        hint: 'Use `git status`.'
      }
    }
  },
  {
    id: 'les-5',
    slug: 'inspecting-history',
    moduleName: 'Git Fundamentals',
    title: 'Inspecting History with Git Log & Diff',
    description: 'Navigate commit history, inspect specific changes, and understand commit hashes.',
    difficulty: 'beginner',
    orderIndex: 3,
    content: {
      learningObjective: 'Inspect commit logs, compare changes with git diff, and understand SHA-1 commit identifiers.',
      explanation: `Every time you commit, Git generates a unique 40-character SHA hash (like \`e4a1b8c...\`) that identifies that exact state.

To review past work, you use \`git log\`. To see what characters changed inside a file before staging or committing, you use \`git diff\`.`,
      keyTerms: [
        { term: 'Commit Hash / SHA', definition: 'A unique cryptographic checksum representing a specific commit.' },
        { term: 'HEAD', definition: 'A pointer indicating the currently checked-out commit or branch.' },
        { term: 'git diff', definition: 'A tool that compares lines between working tree, staging area, and commits.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# Show commit history (one line per commit)
git log --oneline

# Show recent 3 commits with full author and date
git log -n 3

# View unstaged changes in your working directory
git diff

# View changes that are already staged
git diff --staged`,
        explanation: 'Add `--oneline --graph` to git log to see branch topology in your terminal!'
      },
      commonMistakes: [
        'Getting stuck in the terminal pager when running `git log`. Press `q` to exit the log viewer!'
      ],
      exercise: {
        prompt: 'How do you exit `git log` when it opens the pager in your terminal?',
        hint: 'Press the single letter `q`.'
      }
    }
  },

  // Module 3
  {
    id: 'les-6',
    slug: 'github-accounts-and-remotes',
    moduleName: 'GitHub Basics',
    title: 'GitHub Accounts & Remotes',
    description: 'Connect your local repository to a remote repository hosted on GitHub.',
    difficulty: 'beginner',
    orderIndex: 1,
    content: {
      learningObjective: 'Understand remote repositories and connect local Git to GitHub using HTTPS or SSH.',
      explanation: `A **remote repository** is a version of your project hosted on the internet or network. The standard default name Git gives to the primary remote server is \`origin\`.

You can push changes to the remote to back them up or share them with collaborators, and fetch changes that others have pushed.`,
      keyTerms: [
        { term: 'Remote', definition: 'A repository hosted online, typically on GitHub, GitLab, or Bitbucket.' },
        { term: 'Origin', definition: 'The default shorthand name for the primary remote repository URL.' },
        { term: 'Personal Access Token', definition: 'A secure token used instead of passwords when authenticating over HTTPS.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# View configured remotes and their fetch/push URLs
git remote -v

# Link your local repo to a newly created GitHub repository
git remote add origin https://github.com/your-username/my-project.git

# Rename default branch to main if needed
git branch -M main

# Push your main branch and set upstream tracking
git push -u origin main`,
        explanation: 'The `-u` (or `--set-upstream`) flag links your local main branch to origin/main for future simple `git push` commands.'
      },
      commonMistakes: [
        'Accidentally committing passwords, secrets, or .env files before pushing to a public GitHub repo. Always use .gitignore!'
      ],
      exercise: {
        prompt: 'What command verifies which remote URLs are currently configured for your repository?',
        hint: 'Use `git remote -v`.'
      }
    }
  },
  {
    id: 'les-7',
    slug: 'cloning-pushing-pulling',
    moduleName: 'GitHub Basics',
    title: 'Cloning, Fetching, Pulling & Pushing',
    description: 'Download existing projects, sync remote changes, and upload your work.',
    difficulty: 'beginner',
    orderIndex: 2,
    content: {
      learningObjective: 'Clone open-source projects, download updates with git pull, and upload commits with git push.',
      explanation: `Collaborating on open-source projects requires moving commits between your computer and remote servers.
- **git clone**: Downloads an entire repository, including full commit history and branches, to your computer.
- **git fetch**: Downloads new commits from remote, but does NOT merge them into your working files.
- **git pull**: Fetches new commits and immediately merges them into your current local branch (\`git pull = git fetch + git merge\`).
- **git push**: Uploads your local commits to the remote repository.`,
      keyTerms: [
        { term: 'Clone', definition: 'Making a complete local copy of an existing remote repository.' },
        { term: 'Fetch', definition: 'Downloading remote commits without merging them into your working files.' },
        { term: 'Pull', definition: 'Fetching and merging remote commits in a single operation.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# Clone an open-source project to your computer
git clone https://github.com/facebook/react.git

# Enter the cloned project directory
cd react

# Pull the latest changes from the main branch
git pull origin main

# Push your local commits to your remote branch
git push origin feature/my-new-feature`,
        explanation: 'Never force push (`git push -f`) on shared branches like main!'
      },
      commonMistakes: [
        'Forgetting to `cd` into the downloaded folder after running `git clone`.',
        'Running `git pull` with uncommitted changes that conflict with incoming commits.'
      ],
      exercise: {
        prompt: 'If you want to download remote commits to inspect them without altering your local files, should you use `git pull` or `git fetch`?',
        hint: 'Think about which command does NOT automatically merge.'
      }
    }
  },

  // Module 4
  {
    id: 'les-8',
    slug: 'understanding-branches',
    moduleName: 'Branches and Merging',
    title: 'Understanding & Using Branches',
    description: 'Work in parallel without breaking production code using Git branches.',
    difficulty: 'intermediate',
    orderIndex: 1,
    content: {
      learningObjective: 'Create, list, switch, and delete branches to build features in isolation.',
      explanation: `A **branch** in Git is simply a lightweight, movable pointer to a commit. By default, your main codebase lives on the \`main\` (or \`master\`) branch.

When developing a feature or fixing a bug, you create a branch. If you make a mistake, your main branch remains completely untouched and safe. When your feature is tested and ready, you merge it back.`,
      keyTerms: [
        { term: 'Branch', definition: 'An independent line of development pointing to a commit.' },
        { term: 'git switch', definition: 'The modern Git command to switch branches or create new ones.' },
        { term: 'Default Branch', definition: 'The primary branch of a repository, usually named main.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# List all local branches (the * indicates your current branch)
git branch

# Create and switch to a new branch in one command
git switch -c feat/add-dark-mode

# Alternatively, using older syntax
# git checkout -b feat/add-dark-mode

# Switch back to the main branch
git switch main

# Delete a feature branch after it has been merged
git branch -d feat/add-dark-mode`,
        explanation: 'Use clear prefixes like feat/, fix/, or docs/ in branch names for readability.'
      },
      commonMistakes: [
        'Making changes directly on the main branch instead of creating a feature branch for your pull request.',
        'Forgetting which branch you are on before making commits. Always check with `git status` or `git branch`.'
      ],
      exercise: {
        prompt: 'Which modern Git command creates and switches to a new branch named `docs/update-guide`?',
        hint: 'Use `git switch -c docs/update-guide`.'
      }
    }
  },
  {
    id: 'les-9',
    slug: 'merging-and-conflict-resolution',
    moduleName: 'Branches and Merging',
    title: 'Merging Branches & Resolving Conflicts',
    description: 'Integrate code from one branch into another and confidently resolve merge conflicts.',
    difficulty: 'intermediate',
    orderIndex: 2,
    content: {
      learningObjective: 'Merge branches safely, understand conflict markers, and resolve conflicting edits.',
      explanation: `**Merging** takes the independent lines of development from another branch and integrates them into your current branch.

### What is a Merge Conflict?
When two branches modify the *exact same line* of a file in different ways, Git cannot guess which version you want to keep. It pauses the merge and places conflict markers in the file:

\`\`\`
<<<<<<< HEAD (Your current branch)
const theme = 'dark';
=======
const theme = 'system';
>>>>>>> feat/theme-support (Incoming branch)
\`\`\`

To resolve it:
1. Open the file in your editor.
2. Decide which code to keep (or combine them).
3. Delete the conflict marker lines (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`).
4. Stage the resolved file with \`git add\` and commit.`,
      keyTerms: [
        { term: 'Fast-Forward Merge', definition: 'A merge where HEAD pointer moves straight forward without creating a new merge commit.' },
        { term: 'Merge Conflict', definition: 'An event occurring when Git cannot automatically reconcile differences between two commits.' },
        { term: 'Conflict Markers', definition: 'Special lines added by Git to highlight conflicting code sections.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# 1. Switch to the target branch that should receive changes
git switch main

# 2. Merge your feature branch into main
git merge feat/login-form

# 3. If a conflict occurs, inspect affected files
git status

# 4. After manually editing the files and removing conflict markers:
git add src/App.js
git commit -m "Merge feat/login-form and resolve theme conflict"`,
        explanation: 'Don’t panic during conflicts! You can always abort a merge with `git merge --abort`.'
      },
      commonMistakes: [
        'Leaving conflict markers like `<<<<<<< HEAD` inside your code and committing them, breaking the application build.'
      ],
      exercise: {
        prompt: 'What command allows you to safely cancel a merge in progress and return to the state before the merge started?',
        hint: '`git merge --abort`.'
      }
    }
  },

  // Module 5
  {
    id: 'les-10',
    slug: 'github-issues-and-labels',
    moduleName: 'Issues and Project Communication',
    title: 'GitHub Issues & Labels for Beginners',
    description: 'Find accessible issues to work on, interpret labels, and report bugs effectively.',
    difficulty: 'beginner',
    orderIndex: 1,
    content: {
      learningObjective: 'Identify beginner-friendly issues using tags and write clear, reproducible bug reports.',
      explanation: `**GitHub Issues** track ideas, feedback, tasks, and bugs for projects. Think of them as the project’s public to-do and discussion board.

### Beginner-Friendly Labels to Watch For:
- \`good first issue\`: Issues specifically curated by maintainers for newcomers. They usually have well-defined scope.
- \`help wanted\`: The maintainers are actively seeking external contributions for this task.
- \`documentation\` or \`docs\`: Improving tutorials, fixing typos, adding examples, or translating. Excellent entry points!
- \`first-timers-only\`: Reserved strictly for developers who have never made an open-source contribution before.`,
      keyTerms: [
        { term: 'Issue', definition: 'A ticket on GitHub representing a bug, enhancement, or question.' },
        { term: 'Good First Issue', definition: 'A label indicating the issue is approachable for someone unfamiliar with the codebase.' },
        { term: 'Reproduction Steps', definition: 'Clear, step-by-step instructions showing how to trigger a reported bug.' }
      ],
      codeExample: {
        language: 'markdown',
        code: `### Example of a High-Quality Bug Report
**Describe the bug**:
Clicking the "Submit" button on the profile page does not trigger validation.

**Steps to Reproduce**:
1. Go to '/profile'
2. Clear the 'Display Name' input field
3. Click 'Save Changes'
4. No error message is shown, but changes are not saved

**Expected behavior**:
A red validation alert should state: "Display Name is required."

**Environment**:
- OS: Windows 11
- Browser: Chrome 122`,
        explanation: 'Clear reproduction steps allow maintainers to verify and fix issues much faster.'
      },
      commonMistakes: [
        'Opening an issue that merely says "It doesn\'t work" without providing steps, logs, or environment details.',
        'Asking to be assigned to an issue that is already assigned to someone else who is actively working on it.'
      ],
      exercise: {
        prompt: 'Name two GitHub issue labels that signal an issue is suitable for someone making their first open-source contribution.',
        hint: 'Consider `good first issue` and `documentation`.'
      }
    }
  },
  {
    id: 'les-11',
    slug: 'open-source-etiquette',
    moduleName: 'Issues and Project Communication',
    title: 'Open-Source Etiquette & Communication',
    description: 'Learn how to communicate respectfully, ask maintainers questions, and respect volunteers’ time.',
    difficulty: 'beginner',
    orderIndex: 2,
    content: {
      learningObjective: 'Master professional communication and etiquette when collaborating with open-source communities.',
      explanation: `Most open-source maintainers are **volunteers** who maintain projects in their spare time outside of full-time jobs and families. Being respectful, patient, and prepared makes a massive difference.

### Rules of Etiquette:
1. **Search Before Asking**: Check existing issues, pull requests, and discussions before asking a question that has already been answered.
2. **Comment Before Coding**: For non-trivial changes, leave a polite comment on the issue: *"Hi maintainers, I’d like to work on this issue! My proposed approach is X. Could you confirm if that sounds good?"*
3. **Be Patient with Reviews**: Maintainers may take days or even weeks to review pull requests. Avoid pinging them every 24 hours.
4. **Accept Feedback Gracefully**: Code review comments are about improving the codebase, not personal criticism. Thank reviewers for their time.`,
      keyTerms: [
        { term: 'Code Review', definition: 'The process where maintainers examine your code, test it, and suggest improvements.' },
        { term: 'Ping', definition: 'Tagging someone (@username) to request their immediate attention.' }
      ],
      codeExample: {
        language: 'text',
        code: `Good Comment:
"Hi @maintainer! I noticed the typo in docs/setup.md mentioned in this issue.
I would love to submit a fix if this is still open!"

Poor Comment:
"Assign me now" or "@maintainer review my PR PLEASE"`,
        explanation: 'Polite, considerate comments build great relationships with maintainers.'
      },
      commonMistakes: [
        'Submitting a huge unexpected pull request without discussing the feature with maintainers first.',
        'Taking review suggestions personally instead of viewing them as free 1-on-1 mentorship.'
      ],
      exercise: {
        prompt: 'Why should you comment on an issue before spending hours writing code for it?',
        hint: 'To ensure no one else is currently working on it and maintainers agree with your approach.'
      }
    }
  },

  // Module 6
  {
    id: 'les-12',
    slug: 'the-fork-and-pr-workflow',
    moduleName: 'Forks and Pull Requests',
    title: 'The Fork & Pull Request Workflow',
    description: 'Step-by-step walkthrough of the standard open-source contribution workflow.',
    difficulty: 'intermediate',
    orderIndex: 1,
    content: {
      learningObjective: 'Execute the complete open-source lifecycle: fork, clone, set upstream, branch, commit, push, and open PR.',
      explanation: `Because you do not have direct push access to other people’s repositories on GitHub, you use the **Fork & Pull Request** workflow:

1. **Fork**: Create your personal copy of the project on GitHub under your account.
2. **Clone**: Download your fork to your computer.
3. **Add Upstream Remote**: Connect your local repository to the original project so you can sync upstream changes.
4. **Create a Branch**: Make a dedicated branch for your change.
5. **Make Changes & Test**: Edit files and run the project’s test suite.
6. **Push to Your Fork**: Push the branch to your GitHub copy.
7. **Open Pull Request**: Ask the original maintainers to pull your changes into their project!`,
      keyTerms: [
        { term: 'Fork', definition: 'A copy of a repository that lives in your own GitHub account.' },
        { term: 'Upstream', definition: 'The original repository you forked from.' },
        { term: 'Pull Request (PR)', definition: 'A proposal asking maintainers to merge your branch into their repository.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# 1. Clone your fork
git clone https://github.com/your-username/cool-project.git
cd cool-project

# 2. Add upstream remote pointing to original repo
git remote add upstream https://github.com/original-owner/cool-project.git

# 3. Create a feature branch
git switch -c docs/fix-readme-typo

# 4. Make edits, then stage & commit
git add README.md
git commit -m "docs: correct spelling of authentication in README"

# 5. Push to your fork on GitHub
git push -u origin docs/fix-readme-typo`,
        explanation: 'Once pushed, GitHub will display a button: "Compare & pull request".'
      },
      commonMistakes: [
        'Cloning the original repository directly instead of cloning your fork—you will get "Permission Denied" when trying to push.'
      ],
      exercise: {
        prompt: 'What is the standard name given to the remote URL pointing to the original project you forked from?',
        hint: '`upstream`.'
      }
    }
  },
  {
    id: 'les-13',
    slug: 'writing-great-pull-requests',
    moduleName: 'Forks and Pull Requests',
    title: 'Writing Great Pull Requests',
    description: 'Craft titles, descriptions, and automated issue links that make reviews fast and delightful.',
    difficulty: 'intermediate',
    orderIndex: 2,
    content: {
      learningObjective: 'Structure clean pull request descriptions, link related issues, and incorporate review feedback.',
      explanation: `A well-crafted Pull Request makes a maintainer’s job easy, dramatically increasing the likelihood that your PR is reviewed and merged quickly.

### Key Ingredients of a Great PR:
- **Concise Title**: Follow conventional commits (e.g., \`fix: resolve navigation bar clipping on mobile\`).
- **Description of the Problem & Solution**: Summarize what was broken and how your code fixes it.
- **Link Related Issue**: Use magic closing keywords like \`Fixes #42\` or \`Closes #108\` so GitHub automatically closes the issue when your PR merges!
- **Testing Done**: State how you tested the change.
- **Screenshots / GIF**: If your change touches the UI, always provide before-and-after visual evidence.`,
      keyTerms: [
        { term: 'Draft PR', definition: 'A pull request marked as work-in-progress that cannot be merged yet.' },
        { term: 'Fixes #issue_number', definition: 'Special GitHub syntax that automatically closes the linked issue upon merge.' }
      ],
      codeExample: {
        language: 'markdown',
        code: `## Summary of Changes
- Fixes header alignment on screens narrower than 768px.
- Adds responsive media queries to \`Navbar.css\`.

## Linked Issue
Fixes #84

## Testing Checklist
- [x] Tested on Chrome, Firefox, and Safari on desktop.
- [x] Tested on iOS Safari simulated mobile view.
- [x] All unit tests pass (\`npm test\`).`,
        explanation: 'Markdown task lists `[x]` make verification transparent and satisfying.'
      },
      commonMistakes: [
        'Submitting a PR with hundreds of unrelated formatting changes that distract from the actual fix.',
        'Not responding to reviewer questions or leaving requested changes unattended for months.'
      ],
      exercise: {
        prompt: 'What keyword can you write in your PR description so GitHub automatically closes issue #15 when merged?',
        hint: '`Fixes #15` or `Closes #15`.'
      }
    }
  },

  // Module 7
  {
    id: 'les-14',
    slug: 'git-recovery-toolkit',
    moduleName: 'Common Problems and Recovery',
    title: 'Git Recovery: Undoing Mistakes Safely',
    description: 'Learn how to unstage files, amend commits, navigate detached HEAD, and undo mistakes without losing work.',
    difficulty: 'intermediate',
    orderIndex: 1,
    content: {
      learningObjective: 'Safely recover from common Git accidents without losing work or panic-deleting your folder.',
      explanation: `Every developer makes Git mistakes. The good news is: **Git rarely loses data** if you understand safe recovery commands.

### Scenario 1: You staged a file by accident
You ran \`git add secret.env\` but don't want it committed.
Run: \`git restore --staged secret.env\` (Your file remains safely on disk, but is unstaged).

### Scenario 2: You made a typo in the last commit message
Run: \`git commit --amend -m "new message"\` (Updates the most recent commit message).

### Scenario 3: You are in "Detached HEAD" state
This happens when you check out a specific commit hash rather than a branch name.
To safely return: \`git switch main\`.

### Scenario 4: You want to discard unstaged edits in a file
Run: \`git restore filename\` (Warning: this overwrites your uncommitted edits).`,
      keyTerms: [
        { term: 'git restore', definition: 'The modern command to restore working tree files or unstage files.' },
        { term: 'git commit --amend', definition: 'Replaces the previous commit with a new commit containing staged changes or new message.' },
        { term: 'Detached HEAD', definition: 'A state where HEAD points directly to a commit hash rather than a named branch.' }
      ],
      codeExample: {
        language: 'bash',
        code: `# Unstage a file without losing your changes
git restore --staged config/credentials.json

# Fix the last commit message
git commit --amend -m "fix(auth): update token expiration logic"

# Safely return to main if you are in detached HEAD
git switch main

# View what you did recently even if you lost a commit
git reflog`,
        explanation: '`git reflog` is the ultimate safety net—it records every time HEAD moved in the last 90 days.'
      },
      commonMistakes: [
        'Running `git reset --hard` blindly. Hard resets permanently delete uncommitted work in your working directory!'
      ],
      exercise: {
        prompt: 'What command removes a file from the staging area without modifying the actual file content on your disk?',
        hint: '`git restore --staged <file>`.'
      }
    }
  }
];

export const QUIZZES = [
  {
    id: 'quiz-1',
    moduleName: 'Introduction to Open Source',
    title: 'Open Source Foundations Quiz',
    description: 'Test your understanding of open-source definitions, licenses, and repository documents.',
    questions: [
      {
        id: 'q1-1',
        questionText: 'What is the primary difference between open-source software and proprietary software?',
        questionType: 'multiple_choice',
        options: [
          'Open-source software is always completely free of charge, while proprietary is always expensive.',
          'Open-source software provides access to its source code under a permissive or copyleft license.',
          'Proprietary software cannot run on Linux operating systems.',
          'Open-source software does not allow anyone to report bugs.'
        ],
        correctAnswer: 'Open-source software provides access to its source code under a permissive or copyleft license.',
        explanation: 'Open source refers to the availability and licensing of the source code, allowing inspection, modification, and redistribution.',
        points: 10,
        orderIndex: 1
      },
      {
        id: 'q1-2',
        questionText: 'Which file in a repository explains how new contributors should set up their environment, format code, and submit pull requests?',
        questionType: 'multiple_choice',
        options: [
          'LICENSE',
          'CONTRIBUTING.md',
          '.gitignore',
          'package.json'
        ],
        correctAnswer: 'CONTRIBUTING.md',
        explanation: 'CONTRIBUTING.md is specifically designed by maintainers to guide contributors on project workflows and standards.',
        points: 10,
        orderIndex: 2
      },
      {
        id: 'q1-3',
        questionText: 'Under the MIT license, you are legally permitted to use the code in commercial proprietary software as long as you preserve copyright notices.',
        questionType: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'The MIT license is a permissive license that allows commercial use, modification, and distribution with attribution.',
        points: 10,
        orderIndex: 3
      }
    ]
  },
  {
    id: 'quiz-2',
    moduleName: 'Git Fundamentals',
    title: 'Git Core Concepts & Commands Quiz',
    description: 'Verify your knowledge of Git setup, the 3 tree states, and history inspection.',
    questions: [
      {
        id: 'q2-1',
        questionText: 'What are the three main states that Git uses to manage your files?',
        questionType: 'multiple_choice',
        options: [
          'Local, Remote, and Cloud',
          'Working Directory, Staging Area (Index), and Repository (.git)',
          'Draft, Published, and Archived',
          'Frontend, Backend, and Database'
        ],
        correctAnswer: 'Working Directory, Staging Area (Index), and Repository (.git)',
        explanation: 'Git files transition from the working directory onto the staging index, and finally into an immutable commit in the repository.',
        points: 10,
        orderIndex: 1
      },
      {
        id: 'q2-2',
        questionText: 'Which command stages all modified and untracked files in the current directory and subdirectories?',
        questionType: 'multiple_choice',
        options: [
          'git commit -a',
          'git stage --all',
          'git add .',
          'git push'
        ],
        correctAnswer: 'git add .',
        explanation: '`git add .` stages all changes in the current working directory tree.',
        points: 10,
        orderIndex: 2
      },
      {
        id: 'q2-3',
        questionText: 'Put the standard first-time repository commands into correct chronological order:',
        questionType: 'order',
        options: [
          'git init',
          'git add README.md',
          'git commit -m "initial commit"',
          'git remote add origin <url>'
        ],
        correctAnswer: [
          'git init',
          'git add README.md',
          'git commit -m "initial commit"',
          'git remote add origin <url>'
        ],
        explanation: 'First initialize the repository, stage files, create your initial commit, then link the remote.',
        points: 10,
        orderIndex: 3
      }
    ]
  },
  {
    id: 'quiz-3',
    moduleName: 'GitHub Basics',
    title: 'GitHub & Remote Operations Quiz',
    description: 'Check your knowledge of cloning, pushing, pulling, and origin remotes.',
    questions: [
      {
        id: 'q3-1',
        questionText: 'What is the key difference between `git fetch` and `git pull`?',
        questionType: 'multiple_choice',
        options: [
          '`git fetch` only works on public repositories, while `git pull` works on private ones.',
          '`git fetch` downloads remote changes without merging them; `git pull` downloads AND immediately attempts to merge them.',
          '`git fetch` uploads your commits to GitHub; `git pull` downloads them.',
          'There is no difference; they are exact aliases.'
        ],
        correctAnswer: '`git fetch` downloads remote changes without merging them; `git pull` downloads AND immediately attempts to merge them.',
        explanation: '`git pull` is essentially shorthand for `git fetch` followed immediately by `git merge`.',
        points: 10,
        orderIndex: 1
      },
      {
        id: 'q3-2',
        questionText: 'What does the `-u` flag do when running `git push -u origin main`?',
        questionType: 'multiple_choice',
        options: [
          'It forces an unlock on a locked repository.',
          'It uninstalls conflicting remote tags.',
          'It sets up tracking between your local branch and the remote branch for future simple `git push` calls.',
          'It updates your GitHub user profile.'
        ],
        correctAnswer: 'It sets up tracking between your local branch and the remote branch for future simple `git push` calls.',
        explanation: 'The `-u` (upstream) flag configures the default remote tracking branch.',
        points: 10,
        orderIndex: 2
      }
    ]
  },
  {
    id: 'quiz-4',
    moduleName: 'Branches and Merging',
    title: 'Branches & Conflict Resolution Quiz',
    description: 'Test your understanding of branch isolation and merge mechanics.',
    questions: [
      {
        id: 'q4-1',
        questionText: 'Which modern Git command creates and switches to a new branch in a single step?',
        questionType: 'multiple_choice',
        options: [
          'git branch --new <name>',
          'git switch -c <name>',
          'git merge -b <name>',
          'git goto <name>'
        ],
        correctAnswer: 'git switch -c <name>',
        explanation: '`git switch -c <name>` (or older `git checkout -b <name>`) creates the branch and switches HEAD to it immediately.',
        points: 10,
        orderIndex: 1
      },
      {
        id: 'q4-2',
        questionText: 'During a merge conflict, what do the characters `<<<<<<< HEAD` signify?',
        questionType: 'multiple_choice',
        options: [
          'The start of the changes from the branch you are currently on.',
          'A fatal syntax error that permanently damages your git history.',
          'Code that has been automatically approved by GitHub.',
          'Changes originating from the remote server only.'
        ],
        correctAnswer: 'The start of the changes from the branch you are currently on.',
        explanation: 'Conflict markers bound between `<<<<<<< HEAD` and `=======` contain your current checked-out branch edits.',
        points: 10,
        orderIndex: 2
      }
    ]
  },
  {
    id: 'quiz-5',
    moduleName: 'Issues and Project Communication',
    title: 'Issues & Etiquette Assessment',
    description: 'Demonstrate etiquette and issue discovery best practices.',
    questions: [
      {
        id: 'q5-1',
        questionText: 'What is the recommended etiquette before you begin writing code for an open-source issue?',
        questionType: 'multiple_choice',
        options: [
          'Immediately email the maintainer’s personal email address.',
          'Submit an empty pull request with the title "Reserved".',
          'Leave a polite comment on the issue asking if it is available and briefly stating your planned approach.',
          'Post in Reddit that the project has a bug.'
        ],
        correctAnswer: 'Leave a polite comment on the issue asking if it is available and briefly stating your planned approach.',
        explanation: 'Communicating first avoids duplicated effort and confirms that the maintainers agree with your solution.',
        points: 10,
        orderIndex: 1
      }
    ]
  },
  {
    id: 'quiz-6',
    moduleName: 'Forks and Pull Requests',
    title: 'Fork & Pull Request Mastery Quiz',
    description: 'Verify your understanding of upstream remotes and linking issues in PRs.',
    questions: [
      {
        id: 'q6-1',
        questionText: 'Why do you fork an open-source repository on GitHub instead of cloning the main project directly to make changes?',
        questionType: 'multiple_choice',
        options: [
          'Because Git requires paid subscriptions for direct cloning.',
          'Because you typically do not have write (push) permissions to other people’s repositories.',
          'Because forking creates faster build speeds.',
          'Because forking automatically runs tests on your local machine.'
        ],
        correctAnswer: 'Because you typically do not have write (push) permissions to other people’s repositories.',
        explanation: 'Forking copies the project to your own account where you have full push access, allowing you to submit a Pull Request to the original project.',
        points: 10,
        orderIndex: 1
      },
      {
        id: 'q6-2',
        questionText: 'What text in a pull request body causes GitHub to automatically close issue #42 when the PR is merged?',
        questionType: 'multiple_choice',
        options: [
          'Relates to #42',
          'Fixes #42',
          'See issue 42',
          '#42 finished'
        ],
        correctAnswer: 'Fixes #42',
        explanation: 'GitHub recognizes keywords like `Fixes #42`, `Closes #42`, or `Resolves #42` to link and auto-close issues upon merge.',
        points: 10,
        orderIndex: 2
      }
    ]
  },
  {
    id: 'quiz-7',
    moduleName: 'Common Problems and Recovery',
    title: 'Troubleshooting & Recovery Quiz',
    description: 'Demonstrate safe recovery tactics for common Git accidents.',
    questions: [
      {
        id: 'q7-1',
        questionText: 'What is the safe modern command to unstage a file without losing any of your edits in the working directory?',
        questionType: 'multiple_choice',
        options: [
          'git rm -rf <file>',
          'git restore --staged <file>',
          'git reset --hard',
          'git discard <file>'
        ],
        correctAnswer: 'git restore --staged <file>',
        explanation: '`git restore --staged <file>` takes the file out of the staging index while leaving your edits completely intact.',
        points: 10,
        orderIndex: 1
      }
    ]
  }
];

export const PLAYGROUND_CHALLENGES = [
  {
    id: 'ch-1',
    title: 'Challenge 1: Initialize Your First Repo',
    description: 'Turn an empty directory into a full Git repository by initializing it.',
    difficulty: 'Easy',
    goal: 'Run `git init` to initialize the repository.',
    hint: 'Type `git init` and hit Enter.',
    validationRule: { type: 'initialized' },
    rewardPoints: 20
  },
  {
    id: 'ch-2',
    title: 'Challenge 2: Stage & Commit README.md',
    description: 'Stage the new README.md file and create your first commit with a message.',
    difficulty: 'Easy',
    goal: 'Run `git add README.md` and then `git commit -m "docs: add initial README"`',
    hint: 'First use `git add README.md`, then commit with `git commit -m "your message"`.',
    validationRule: { type: 'commit_count', minCommits: 1 },
    rewardPoints: 30
  },
  {
    id: 'ch-3',
    title: 'Challenge 3: Create & Switch to a Feature Branch',
    description: 'Create a new feature branch named `feat/contribute-guide` and switch to it.',
    difficulty: 'Medium',
    goal: 'Run `git switch -c feat/contribute-guide`',
    hint: 'You can use `git switch -c feat/contribute-guide` or `git checkout -b feat/contribute-guide`.',
    validationRule: { type: 'current_branch', branch: 'feat/contribute-guide' },
    rewardPoints: 35
  },
  {
    id: 'ch-4',
    title: 'Challenge 4: Merge Feature Branch into Main',
    description: 'Switch back to `main` and merge your `feat/contribute-guide` branch.',
    difficulty: 'Medium',
    goal: 'Switch to `main` with `git switch main`, then run `git merge feat/contribute-guide`',
    hint: 'Always switch to the destination branch before calling `git merge`.',
    validationRule: { type: 'merged_branch', branch: 'feat/contribute-guide' },
    rewardPoints: 50
  }
];
