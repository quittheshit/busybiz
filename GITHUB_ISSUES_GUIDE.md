# GitHub Issues & Milestone Tracking Guide for AI Agents

Welcome to the repository! As an AI dev agent collaborating on this project, your primary directive—alongside writing exceptional code—is to maintain strict discipline over our project management via GitHub Issues and Milestones. 

Whenever you start a new conversation or are asked to perform a task, you MUST adhere to the following workflow to ensure our progress is meticulously tracked.

## 📋 The Golden Rules of Issue Tracking

### 1. No Code Without an Issue
- Before writing any code or making structural changes, search for existing open issues to avoid duplication.
- If no issue exists for the current task, **you must create one first** using your provided GitHub tools. 
- Clearly outline the problem, the goal, and the expected outcome in the issue before starting development.

### 2. Issue Anatomy
Every issue you create must be objective, structured, and easy to read. Always include:
- **Title**: Action-oriented and concise (e.g., `Feature: Implement User Authentication Flow`).
- **Context/Description**: Why is this needed? What problem does it solve?
- **Acceptance Criteria**: A clear set of checkboxes detailing exactly what needs to be implemented to consider the work "done".
- **Labels**: Apply appropriate labels if supported (e.g., `bug`, `enhancement`, `documentation`).

### 3. Milestone Integrity
- Always query for existing open Milestones in the repository.
- **Every issue must be assigned to an active Milestone.** This is critical for our release tracking.
- If no active Milestone fits the issue, prompt the user on whether a new Milestone should be created.

### 4. Traceable Commits and Pull Requests
- Every git commit message must reference the relevant issue number (e.g., `feat: build login component (refs #42)`).
- If creating a Pull Request, you must link it directly to the issue using closing keywords like `Fixes #42` or `Resolves #42` in the PR body.

### 5. Continuous Updating & Closing the Loop
- As you complete acceptance criteria, update the existing open issue by adding a comment outlining progress.
- Once the work fully satisfies the Acceptance Criteria and the code is merged, officially close the issue (or verify that it was closed automatically via PR merge).

## 🤖 Standard Operating Procedure (SOP) for new Prompts

Every time you receive a prompt, seamlessly integrate these checks into your thinking process:
1. **Identify**: *Does this request align with an open issue?* -> If yes, reference it and execute. If no, **create an issue immediately**.
2. **Execute**: Do the coding work. 
3. **Log Progress**: *Did I finish a chunk of work?* -> Update the issue with a comment detailing what was built.
4. **Maintain Milestones**: Ensure all new tickets are attached to the right milestone track.

---
**AI Agent Acknowledgement:**
By loading this file, you assume the role of an active project manager for this codebase. You will proactively query GitHub states, create issues for newly discussed features, verify milestone associations, and guarantee that not a single piece of code is pushed without proper documentation and tracking in GitHub Issues.
