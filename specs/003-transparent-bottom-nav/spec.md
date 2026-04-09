# Feature Specification: Transparent Bottom Navigation

**Feature Branch**: `003-transparent-bottom-nav`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "меню не прозрачное и в самом низу"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bottom Nav Appears Transparent Over Page Content (Priority: P1)

An applicant scrolls through the scholarship list. The bottom navigation bar floats at the very bottom of the screen with a transparent background, allowing the page content behind it to show through. The bar does not have a solid opaque block that visually disconnects from the rest of the UI.

**Why this priority**: The current solid `#111827` background makes the nav bar look like a heavy footer. This is the core visual issue reported.

**Independent Test**: Open the home page, scroll content behind the nav bar and confirm the background is transparent — not a solid block.

**Acceptance Scenarios**:

1. **Given** the user is on any page with the bottom nav, **When** the page renders, **Then** the nav bar background is fully transparent — not a solid opaque color.
2. **Given** the nav bar is transparent, **When** the user scrolls content beneath it, **Then** the page content is visible through the nav area.
3. **Given** the nav bar, **When** viewed on max-w-sm layout, **Then** it is pinned to the absolute bottom of the visible screen with no gap below it.

---

### User Story 2 - Nav Bar Sits Flush at Screen Bottom (Priority: P2)

The nav bar sits flush at the very bottom edge of the screen with no visible gap or extra background block below the icons.

**Why this priority**: Extra padding or background bleed makes the bar appear to float above the bottom edge rather than anchoring to it.

**Independent Test**: View the bottom of the screen — the nav icons are the last visible element with no dead space beneath them.

**Acceptance Scenarios**:

1. **Given** the bottom nav is visible, **When** the user looks at the very bottom of the screen, **Then** there is no blank space beneath the icon row.
2. **Given** a device with a home indicator safe area, **When** the nav is displayed, **Then** icons are not hidden behind the system home indicator.

---

### Edge Cases

- If page content is short, the nav must still be pinned to the bottom (not flow with content).
- The last card in any list must remain reachable by scrolling — page content needs sufficient bottom padding to clear the nav bar height.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The bottom nav bar background MUST be fully transparent (not a solid opaque color).
- **FR-002**: The bottom nav bar MUST be fixed to the absolute bottom of the viewport at all times.
- **FR-003**: The page scroll container MUST have sufficient bottom padding so the last content item is not permanently hidden behind the nav bar.
- **FR-004**: The nav bar MUST respect device safe-area insets at the bottom to avoid overlapping system UI.
- **FR-005**: The top border on the nav bar MAY be removed if it creates visual noise against the transparent background.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The nav bar background is transparent — verifiable by scrolling page content beneath it and confirming bleed-through.
- **SC-002**: Zero pixels of blank solid space appear below the nav bar icons on a 375×812 viewport.
- **SC-003**: The last list item on any page is reachable by scrolling (not permanently hidden by the nav bar).

## Assumptions

- Transparency is achieved with `background: transparent` — no external blur/glassmorphism library required.
- The top border on the nav bar can be removed as part of this change.
- Safe-area inset is handled via `padding-bottom: env(safe-area-inset-bottom)`.
- This spec covers only the visual style of the existing nav bar in `home/page.tsx`. Adding the nav to other pages is a separate concern (spec 002).
