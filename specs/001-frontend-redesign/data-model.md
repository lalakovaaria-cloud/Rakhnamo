# Data Model: Frontend Redesign

**Branch**: `001-frontend-redesign` | **Date**: 2026-04-09

## Extended Item Shape (`home/page.tsx`)

Each item in the hardcoded `items` array gains three new fields:

```ts
type Item = {
  id: number;
  type: "Scholarship" | "Deadline";
  title: string;
  desc: string;
  href: string;                   // kept for fallback, unused by modal

  // New fields for modal
  institution: string;            // shown at top of modal (e.g. "Oxford University")
  daysLeft: number;               // large countdown number
  hoursLeft: number;              // sub-label "23h 45m"
  documents: string[];            // checklist items (e.g. ["Personal Statement", "CV"])
  requiredFiles: {                // required files list
    icon: string;                 // emoji (e.g. "📄", "💰", "🌐")
    name: string;                 // filename (e.g. "passport_copy.pdf")
  }[];
};
```

## Modal State

```ts
const [selected, setSelected] = useState<Item | null>(null);
```

- `null` → modal closed
- `Item` → modal open, showing that item's detail

## UI Contracts (component slots)

```
<HomePage>
  ├── Header          "RAKHNAMO" green title
  ├── FilterChips     All / Scholarship / Deadline  (existing)
  ├── CardList        one <Card> per filtered item
  │     └── <Card>
  │           ├── TypeBadge       e.g. "Deadline" green pill
  │           ├── StarButton      toggle save (existing)
  │           ├── Title
  │           ├── Description
  │           └── LearnMoreBtn    onClick → setSelected(item)
  ├── BottomNav       (existing)
  └── DetailModal     renders only when selected !== null
        ├── Backdrop            fixed overlay, onClick → setSelected(null)
        ├── Panel               slide-up sheet
        │     ├── InstitutionName
        │     ├── CloseBtn       onClick → setSelected(null)
        │     ├── CountdownBlock  daysLeft (big green) + "Days Remaining" + hoursLeft
        │     ├── DocumentChecklist  maps selected.documents
        │     ├── RequiredFiles      maps selected.requiredFiles
        │     └── ApplyNowBtn
        └── (scroll within Panel)
```

## Files to Change

| File | Change |
|------|--------|
| `application/app/home/page.tsx` | Extend `items` data, add modal state, replace `<Link href>` on Learn More with `onClick → setSelected`, add `<DetailModal>` inline at bottom of return |
| `application/app/scholarships/page.tsx` | Add bottom nav bar (copy from home), align card background to `#111827` |
| `application/app/deadlines/page.tsx` | Add bottom nav bar (copy from home) |
