# Repository Directives & Workflow Rules

## 📋 Mandatory GitHub Issues & Project Management Workflow

Before writing any code or making structural changes in this repository, the agent MUST strictly follow the guidelines set out in [`GITHUB_ISSUES_GUIDE.md`](file:///c:/Users/Bruger/OneDrive/Skrivebord/Code/busybiz/busybiz/GITHUB_ISSUES_GUIDE.md):

1. **No Code Without an Issue**:
   - Always query existing open issues before writing code.
   - If no issue exists for the requested task, **create one first** using available GitHub tools.
   - Outline the context, objective, and acceptance criteria in the issue before starting work.

2. **Issue Anatomy**:
   - Every issue must include an action-oriented title, clear context, checkbox acceptance criteria, and appropriate labels.

3. **Milestone Integrity**:
   - Query active Milestones in the repository.
   - Every issue MUST be assigned to an active Milestone.

4. **Traceable Commits & Pull Requests**:
   - Reference issue numbers in git commits (e.g. `refs #12`).
   - Use closing keywords in PR descriptions (e.g. `Fixes #12`).

5. **Continuous Progress Logging & Closing**:
   - Post progress comments as acceptance criteria are met.
   - Close the issue once work is complete and verified.

6. **Implementation Plan Suggestion**:
   - Whenever asked to perform a coding task, suggest to the user whether an implementation plan (`IMPLEMENTATION.md`) should be created first.
   - For small/minor changes, note that an implementation plan file might not be necessary, but always prompt or suggest it so the user can decide.

