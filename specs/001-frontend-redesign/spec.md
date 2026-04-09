# Feature Specification: Frontend Redesign

**Feature Branch**: `001-frontend-redesign`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "измени дизайн фронтенда на тот что в папке ui"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Scholarships with New Card Layout (Priority: P1)

An applicant opens the app and sees a redesigned scholarship list. Each scholarship is displayed as a card with a bold title, short description, and a prominent "Learn More" button inside the card. Some cards show a "Deadline" badge. The header shows "RAKHNAMO" in green. A filter chip bar ("All" and other categories) sits below the header.

**Why this priority**: This is the primary screen users land on — it must reflect the new visual identity immediately and deliver value without any interaction.

**Independent Test**: Open the scholarships page and verify new card layout renders correctly with all visual elements present.

**Acceptance Scenarios**:

1. **Given** the user is on the scholarships page, **When** the page loads, **Then** the header shows "RAKHNAMO" in bold green, a filter chip row appears below it, and each scholarship renders as a card with title, description, "Learn More" button, and optionally a "Deadline" badge and star icon.
2. **Given** multiple scholarships exist, **When** a scholarship has an upcoming deadline, **Then** a green "Deadline" pill badge is visible on that card.
3. **Given** the scholarship list, **When** viewed on a 375px-wide mobile screen, **Then** all card elements are fully visible without horizontal scrolling.

---

### User Story 2 - View Scholarship Detail in Modal (Priority: P2)

An applicant taps "Learn More" on a card. A modal slides up showing the scholarship detail: the university name, a countdown timer displaying days and hours remaining until the application deadline, a document checklist, and a list of required files — each with an icon and filename. A full-width green "APPLY NOW" button appears at the bottom. A circular close button (×) dismisses the modal.

**Why this priority**: The detail view is the core conversion point — applicants must see requirements and deadlines clearly before applying.

**Independent Test**: Tap "Learn More" on any card, verify modal opens with deadline countdown, document checklist, required files, and "APPLY NOW" button visible.

**Acceptance Scenarios**:

1. **Given** the user taps "Learn More", **When** the modal opens, **Then** the university name appears at top-left, a circular × button appears at top-right, and the modal covers the screen.
2. **Given** the modal is open, **When** viewing the deadline section, **Then** a large number shows days remaining in green, "Days Remaining" label in white below it, and hours/minutes in smaller gray text.
3. **Given** the modal is open, **When** scrolling, **Then** the document checklist items (with circular checkboxes) and required files (with emoji icons and filenames in dark rounded cards) are visible.
4. **Given** the modal is open, **When** the user taps the × button, **Then** the modal closes and the list is visible again.

---

### User Story 3 - Bottom Navigation Bar (Priority: P3)

A persistent bottom navigation bar is visible across screens, allowing the user to switch between main sections (e.g., home, scholarships, documents, profile) without going back to the role selection screen.

**Why this priority**: Improves navigation UX but the app is usable without it — lower priority than core content screens.

**Independent Test**: Verify bottom nav bar renders on the main screens and tapping icons navigates to the correct section.

**Acceptance Scenarios**:

1. **Given** any main page, **When** the page renders, **Then** a bottom navigation bar with section icons is visible.
2. **Given** the bottom nav, **When** a user taps an icon, **Then** they are taken to the corresponding section.

---

### Edge Cases

- What happens when a scholarship has no deadline — the "Deadline" badge must not appear and the countdown must be hidden.
- What happens when the required files list is empty — the "Required Files" section must be hidden or show a placeholder.
- What happens if the modal is opened and the deadline has already passed — show "Deadline passed" instead of the countdown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The scholarships page MUST display a "RAKHNAMO" heading in bold green at the top.
- **FR-002**: The scholarships page MUST show a horizontal row of filter chips below the heading (minimum: "All").
- **FR-003**: Each scholarship card MUST include: bold title, short description, and a "Learn More" button.
- **FR-004**: Cards with an upcoming deadline MUST display a green "Deadline" pill badge and a star/bookmark icon.
- **FR-005**: Tapping "Learn More" MUST open a full-screen modal with scholarship detail.
- **FR-006**: The scholarship detail modal MUST show: university name, × close button, deadline countdown (days + hours/minutes), document checklist with circular checkboxes, required files list with icons, and a full-width green "APPLY NOW" button.
- **FR-007**: The countdown MUST display the number of days remaining in large green text with hours/minutes below.
- **FR-008**: Required files MUST be displayed as dark rounded cards with a relevant emoji icon and the filename.
- **FR-009**: The app MUST show a persistent bottom navigation bar on all main screens.
- **FR-010**: All interactive elements MUST meet minimum 44px touch target size for mobile usability.

### Key Entities

- **Scholarship Card**: Visual unit representing one scholarship — title, description, deadline flag, star icon, "Learn More" action.
- **Scholarship Detail Modal**: Overlay showing full scholarship info — deadline countdown, document checklist, required files, apply CTA.
- **Filter Chip**: Selectable pill for filtering the scholarship list by category.
- **Bottom Navigation Bar**: Persistent footer with icon-based section links.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All scholarship cards render correctly on a 375px-wide screen without layout overflow.
- **SC-002**: The detail modal opens within 200ms of tapping "Learn More" (perceived as instant).
- **SC-003**: The deadline countdown correctly reflects the days and hours remaining for each scholarship.
- **SC-004**: 100% of UI elements visible in the `ui/` screenshots are present in the implemented design.
- **SC-005**: The bottom navigation bar is visible on all main app screens.

## Assumptions

- The color palette remains dark navy (`#0b1220` background, `#162032` cards) — only layout and component shapes change.
- The "APPLY NOW" button navigates to an external application URL or triggers a placeholder action (no backend required for v1).
- The star/bookmark icon is visual only — no persistence of bookmarks is required in this spec.
- The document checklist items and required files are sourced from the existing hardcoded data arrays.
- The bottom navigation bar links to the existing routes (`/home`, `/scholarships`, `/documents`, `/deadlines`).
- All text remains in Russian/Tajik as per current content.
