# Design System Development Workflow

This document outlines the standard workflow and guidelines for working with tasks in the design system project.

## Task Management

### Task Lifecycle
1. **Pending**: Task is defined but not yet started
2. **In Progress**: Task is actively being worked on
3. **Completed**: Task is finished and changes are merged to main

### Task Naming Convention
Task files follow this pattern:
```
{STATUS}_TASK-{ID}_descriptive-name.md
```

Where:
- `{STATUS}`: One of `pending`, `inprogress`, or `completed`
- `{ID}`: Sequential number with leading zeros (e.g., 001, 002)
- `descriptive-name`: Short kebab-case description

### Branch Naming
When starting work on a task, create a new branch using the format:
```
git checkout -b task/TASK-{ID}/short-description
```

Example:
```
git checkout -b task/TASK-001/export-consistency
```

## Development Workflow

### Starting a New Task
1. Create or update the task document in `docs/tasks/`
2. Verify the current state of the main branch builds successfully
3. Create a new branch following the naming convention
4. Update the task status to `inprogress_`
5. **Verify Project Structure**
   - Review `PROJECT_STRUCTURE.md` to understand where files should be placed
   - Ensure all new files follow the established patterns
   - Keep components self-contained with their types and styles
6. Implement the changes following the coding standards
7. Update documentation as needed, including `PROJECT_STRUCTURE.md` if making structural changes
8. Ensure the code builds successfully before committing changes

### Project Structure Compliance
All changes must adhere to the structure defined in `PROJECT_STRUCTURE.md`:
- Components go in `src/components/ComponentName/`
- Demo pages go in `demo/pages/component-name/`
- Documentation goes in `docs/`
- Tests go in `tests/`
- Build output goes to `dist/`

Before submitting any changes, verify:
- [ ] File locations match the project structure
- [ ] Component structure follows the pattern (index.ts, Component.tsx, types.ts, styles.ts)
- [ ] Demo pages exist for new components
- [ ] Documentation is updated if structure changes are made

### Committing Changes
- Use [Conventional Commits](https://www.conventionalcommits.org/) format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code changes that neither fix bugs nor add features
  - `test:` for adding tests
  - `chore:` for maintenance tasks

### Pull Requests
- Reference the task ID in the PR title: `[TASK-XXX] Description of changes`
- Include a summary of changes in the PR description
- Link to any related issues or tasks
- Request review from at least one team member

### Completing a Task
1. Ensure all tests pass
2. Verify successful build locally
   - Run `npm run build` or equivalent build command
   - Resolve any build errors or warnings
3. Recheck all changes for:
   - Code quality and consistency
   - TypeScript type safety
   - Documentation updates
   - Test coverage
4. Update documentation if needed
5. Update the task status to `completed_`
6. Create a PR if not already done
7. After PR is merged and CI/CD pipeline passes:
   - Verify the build in the target environment
   - Confirm all functionality works as expected
   - Delete the feature branch

## Code Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Enable strict type checking
- Prefer interfaces over types for public API
- Use functional components with TypeScript
- Follow React best practices for hooks and state management

### Styling
- Use Tailwind CSS for styling
- Follow the design tokens defined in the system
- Use CSS variables for theming

### Testing
- Write unit tests for all components
- Use React Testing Library for component tests
- Aim for good test coverage
- Test both functionality and accessibility

## Documentation
- Keep documentation up to date
- Document component props and usage
- Include examples in storybook/story files
- Update CHANGELOG.md for all user-facing changes

## Review Process
- All code must be reviewed before merging to main
- Address all review comments before merging
- Ensure CI/CD pipelines pass before merging
- Verify the build in the target environment after merge
- Perform a final smoke test of the changes
- Document any additional steps needed for deployment
- Squash and merge PRs to keep history clean
