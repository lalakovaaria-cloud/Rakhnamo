# Tasks: Transparent Bottom Navigation

**Input**: Design documents from `/specs/003-transparent-bottom-nav/`
**Prerequisites**: plan.md ✓, spec.md ✓

## Tasks

- [x] [T01] [US1] Make bottom nav background transparent in `application/app/home/page.tsx` — change `background: "#111827"` to `background: "transparent"`, remove `borderColor` style prop, remove `border-t` class
- [x] [T02] [US2] Add safe-area bottom padding to nav bar in `application/app/home/page.tsx` — add `paddingBottom: "env(safe-area-inset-bottom)"` to nav container style
- [x] [T03] [US1] Ensure page content clears the nav bar — verify `pb-24` on the card list container is sufficient (no change needed if already present)
