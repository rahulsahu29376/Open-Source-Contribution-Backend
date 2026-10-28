-- ====================================================================
-- Open-Source Beginner Guide - Database Seed Script
-- Populates default achievements, lessons, and quizzes
-- ====================================================================

-- 1. Insert Achievements
INSERT INTO achievements (id, slug, name, description, icon, criteria) VALUES
('00000000-0000-0000-0000-000000000001', 'git-explorer', 'Git Explorer', 'Began your journey into version control by completing the Git Fundamentals module.', 'Compass', '{"type": "module_complete", "module": "Git Fundamentals"}'::jsonb),
('00000000-0000-0000-0000-000000000002', 'first-commit', 'First Commit', 'Staged and committed your first set of changes in the Git Playground.', 'GitCommit', '{"type": "playground_action", "action": "commit"}'::jsonb),
('00000000-0000-0000-0000-000000000003', 'branch-builder', 'Branch Builder', 'Created and switched between isolated feature branches.', 'GitBranch', '{"type": "playground_action", "action": "branch"}'::jsonb),
('00000000-0000-0000-0000-000000000004', 'merge-learner', 'Merge Learner', 'Successfully merged a feature branch and verified repository history.', 'GitMerge', '{"type": "playground_action", "action": "merge"}'::jsonb),
('00000000-0000-0000-0000-000000000005', 'issue-detective', 'Issue Detective', 'Explored real repositories and bookmarked a beginner-friendly issue.', 'Search', '{"type": "bookmark_created", "resourceType": "issue"}'::jsonb),
('00000000-0000-0000-0000-000000000006', 'pr-apprentice', 'Pull Request Apprentice', 'Walked through all 10 steps of the First Contribution Wizard.', 'GitPullRequest', '{"type": "wizard_complete"}'::jsonb),
('00000000-0000-0000-0000-000000000007', 'quiz-master', 'Quiz Master', 'Scored 100% on any module quiz assessment.', 'Award', '{"type": "quiz_perfect_score"}'::jsonb),
('00000000-0000-0000-0000-000000000008', 'open-source-contributor', 'Open-Source Contributor', 'Logged and submitted your first real-world open-source pull request.', 'Sparkles', '{"type": "contribution_logged"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Sample Lessons
INSERT INTO lessons (id, slug, title, description, module_name, difficulty, content, order_index, published) VALUES
('10000000-0000-0000-0000-000000000001', 'what-is-open-source', 'What is Open Source Software?', 'Explore the foundations of open-source software, collaborative culture, and software licenses.', 'Introduction to Open Source', 'beginner', '{"learningObjective": "Understand open-source software and licenses."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000002', 'reading-a-repository', 'How to Read an Open-Source Repository', 'Learn how to navigate repository files like README, CONTRIBUTING, and LICENSE.', 'Introduction to Open Source', 'beginner', '{"learningObjective": "Quickly identify core project files."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000003', 'git-introduction-and-setup', 'Git Introduction & First-Time Setup', 'Understand what Git is and configure your identity.', 'Git Fundamentals', 'beginner', '{"learningObjective": "Install and configure Git."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000004', 'repository-basics-and-staging', 'Repository Basics, Staging & Commits', 'Master working directory, staging area, and repository commits.', 'Git Fundamentals', 'beginner', '{"learningObjective": "Stage and commit changes."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000005', 'inspecting-history', 'Inspecting History with Git Log & Diff', 'Navigate commit history and inspect specific changes.', 'Git Fundamentals', 'beginner', '{"learningObjective": "Inspect commit logs and diffs."}'::jsonb, 3, true),
('10000000-0000-0000-0000-000000000006', 'github-accounts-and-remotes', 'GitHub Accounts & Remotes', 'Connect local repositories to remote repositories on GitHub.', 'GitHub Basics', 'beginner', '{"learningObjective": "Configure remotes and understand origin."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000007', 'cloning-pushing-pulling', 'Cloning, Fetching, Pulling & Pushing', 'Sync code between your local machine and GitHub.', 'GitHub Basics', 'beginner', '{"learningObjective": "Clone repositories and exchange commits."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000008', 'understanding-branches', 'Understanding & Using Branches', 'Work in parallel without breaking production code.', 'Branches and Merging', 'intermediate', '{"learningObjective": "Create and switch branches."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000009', 'merging-and-conflict-resolution', 'Merging Branches & Resolving Conflicts', 'Integrate code and confidently resolve merge conflicts.', 'Branches and Merging', 'intermediate', '{"learningObjective": "Merge branches and resolve conflict markers."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000010', 'github-issues-and-labels', 'GitHub Issues & Labels for Beginners', 'Find accessible issues to work on and report bugs effectively.', 'Issues and Project Communication', 'beginner', '{"learningObjective": "Find good first issues and write clear bug reports."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000011', 'open-source-etiquette', 'Open-Source Etiquette & Communication', 'Learn respectful communication and collaboration with maintainers.', 'Issues and Project Communication', 'beginner', '{"learningObjective": "Communicate respectfully with maintainers."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000012', 'the-fork-and-pr-workflow', 'The Fork & Pull Request Workflow', 'Standard open-source contribution workflow end-to-end.', 'Forks and Pull Requests', 'intermediate', '{"learningObjective": "Execute the full fork, clone, and PR lifecycle."}'::jsonb, 1, true),
('10000000-0000-0000-0000-000000000013', 'writing-great-pull-requests', 'Writing Great Pull Requests', 'Craft titles, descriptions, and linked issues in PRs.', 'Forks and Pull Requests', 'intermediate', '{"learningObjective": "Write high-quality pull request summaries."}'::jsonb, 2, true),
('10000000-0000-0000-0000-000000000014', 'git-recovery-toolkit', 'Git Recovery: Undoing Mistakes Safely', 'Unstage files, amend commits, and recover from mistakes.', 'Common Problems and Recovery', 'intermediate', '{"learningObjective": "Safely recover from common Git accidents."}'::jsonb, 1, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Quizzes
INSERT INTO quizzes (id, module_name, title, description, published) VALUES
('20000000-0000-0000-0000-000000000001', 'Introduction to Open Source', 'Open Source Foundations Quiz', 'Test your understanding of open-source definitions, licenses, and repository documents.', true),
('20000000-0000-0000-0000-000000000002', 'Git Fundamentals', 'Git Core Concepts & Commands Quiz', 'Verify your knowledge of Git setup, the 3 tree states, and history inspection.', true),
('20000000-0000-0000-0000-000000000003', 'GitHub Basics', 'GitHub & Remote Operations Quiz', 'Check your knowledge of cloning, pushing, pulling, and origin remotes.', true),
('20000000-0000-0000-0000-000000000004', 'Branches and Merging', 'Branches & Conflict Resolution Quiz', 'Test your understanding of branch isolation and merge mechanics.', true)
ON CONFLICT (id) DO NOTHING;
