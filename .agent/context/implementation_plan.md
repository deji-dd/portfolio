# Content & Workflow Upgrade Plan

## Goal Description

We will improve the portfolio's content by filling in placeholders, expanding description text to be more professional and "System Command Center" themed, and establishing a proper GitHub contribution workflow with issue and PR templates.

## User Review Required

> [!IMPORTANT] > **Missing About Page**: The previous task list mentioned an About page, but it does not exist in the `app` directory. I propose creating a dedicated `app/about/page.tsx` or integrating a rich "About Me" section into the main page. (Plan assumes integration into main page for now to keep the single-page app feel unless requested otherwise).
> **"IMG_NOT_FOUND"**: The Hero section has a deliberate "IMG_NOT_FOUND" text. Do we want to keep this as a stylistic choice (glitch aesthetic) or replace it with a real image path? I will default to keeping the _aesthetic_ but maybe refining the text to "Identity Redacted" or similar if no image is provided.

## Proposed Changes

### GitHub Workflow

#### [NEW] `.github/ISSUE_TEMPLATE/bug_report.md`

- Standardized bug reporting format.

#### [NEW] `.github/ISSUE_TEMPLATE/feature_request.md`

- Template for proposing new features.

#### [NEW] `.github/pull_request_template.md`

- Checklist for PRs (Tests, Linting, Screenshots).

### Content Improvements

#### [MODIFY] [hero-section.tsx](file:///home/deji/repos/portfolio/components/hero-section.tsx)

- Refine the "IMG_NOT_FOUND" placeholder to be more "Cyberpunk/Terminal" styled (e.g., `[IDENTITY_REDACTED]`) if no real image is available.
- Enhance the bio text to be more punchy.

#### [MODIFY] [system-logs.tsx](file:///home/deji/repos/portfolio/components/system-logs.tsx)

- Add more granular "career milestones" if available, or just polish the existing ones to sound more "technical" (e.g. "Mainframe Initialization" instead of "Site Creation").

#### [NEW] [about-section.tsx](file:///home/deji/repos/portfolio/components/about-section.tsx)

- Create a new component for extended bio/about information, possibly to be added to the main page scroll.

#### [MODIFY] [page.tsx](file:///home/deji/repos/portfolio/app/page.tsx)

- Import and add `AboutSection`.

## Verification Plan

### Automated

- None (Content changes).

### Manual Verification

- **Visual Check**: Verify the `HeroSection` looks good.
- **Workflow Check**: Verify `.github` folder structure is recognized by GitHub (requires pushing, but we can verify file existence).
