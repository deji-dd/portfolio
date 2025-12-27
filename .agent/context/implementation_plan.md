# implementation_plan.md

## Goal

Refine the UI/UX based on specific user feedback:

1.  **Project Cards**: Adopt Aceternity's **Hover Border Gradient** effect.
2.  **Tech Stack**: Use the user-provided **Animated Skeleton Card** code.
3.  **Loading Overlay**: Implement immediate-start logic independent of component load, waiting for window load to finish.
4.  **Timeline**: Move to a standalone section.

## Proposed Changes

### [New Components]

#### [NEW] [hover-border-gradient.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/hover-border-gradient.tsx)

- Implement Aceternity's `HoverBorderGradient` component logic.
- This creates a gradient border that follows the mouse or highlights on hover.

#### [NEW] [tech-stack-card.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/tech-stack-card.tsx)

- **Exact Implementation** of the user's provided code (`CardDemo`, `Skeleton`, `Sparkles`, etc.).
- Refactor imports to match project structure.

#### [NEW] [tech-stack-display.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/tech-stack-display.tsx)

- **Reinvention**: A "Command Center" style dashboard for the tech stack.
- **Visuals**: Grid of "server modules", status lights, uptime counters.
- **Animation**: Scanning effect, blinking indicators.

#### [NEW] [encrypted-text.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/encrypted-text.tsx)

- Aceternity's "HyperText" or "Encrypted" effect.
- Characters cycle/scramble before settling on the final text.
- Usage: Replace "Ayodeji B." static text.

#### [NEW] [hero-highlight.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/hero-highlight.tsx)

- Background highlight effect for the subtitle.

#### [MODIFY] [hero-section.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/hero-section.tsx)

- Integrate `EncryptedText` and `HeroHighlight`.
- Add a circular/rounded-square image placeholder (right aligned or integrated).

### [Overlay Logic]

#### [MODIFY] [loading-overlay.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/loading-overlay.tsx)

- `useState` for loading state starts `true`.
- `useEffect` starts interval immediately (0ms delay).
- `useEffect` listens for `window.onload`.
- Loader only clears when `animationComplete && pageLoaded`.

### [Page Structure]

#### [MODIFY] [projects-grid.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/projects-grid.tsx)

- Replace `BentoGridItem` wrappers with `HoverBorderGradient` wrappers (as the card container).
- Remove `SystemLogs` and `StackCloud`.

#### [MODIFY] [page.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/app/page.tsx)

- **Structure**:
  1.  Hero
  2.  `ProjectsGrid` (with Hover Border Gradient Cards)
  3.  `SystemLogs` (Timeline - Standalone)
  4.  `ProjectsGrid` (with Hover Border Gradient Cards)
  5.  `SystemLogs` (Timeline - Standalone)
  6.  `TechStack` (New Tech Stack Display - Standalone or Card)
  - Replace `TechStackCard` contents with `TechStackDisplay`.

### [Refinement Phase]

#### [MODIFY] [encrypted-text.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/ui/encrypted-text.tsx)

- Add `delay` prop to start the scrambling effect _after_ the loading overlay has likely finished (approx 3-4s).

#### [MODIFY] [projects-grid.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/projects-grid.tsx)

- **Layout Stability**: Enforce fixed width for the sidebar (e.g., `w-80 shrink-0`) and `min-w-0` for the main content to prevent flexbox jitter during content swaps.

### [Grid Refactor]

#### [MODIFY] [projects-grid.tsx](file:///Users/mac/Desktop/cloud-lab/portfolio/components/projects-grid.tsx)

- **State**: Add `selectedProject` state.
- **Layout**:
  - Default: Standard Grid.
  - Selected:
    - `AnimatePresence` layout transition.
    - The Selected Card becomes a "Sidebar Item" on the Left (or the whole list moves left/shrinks).
    - A "Details Pane" expands on the Right.
- **Animation**: Use `layoutId` for smooth shared element transition.
- **Remove**: `AnimatedModal` wrapping.

## Verification Plan

### Manual Verification

- **Overlay**: Reload page, verify text starts instantly.
- **Cards**: Verify hover border gradient animation works.
- **Tech Stack**: Verify sparkles and skeleton animation match sample.
