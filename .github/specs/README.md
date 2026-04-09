# Specs

This directory contains feature specifications written **before** implementation.

## Workflow

1. Create a new spec file from the template: `cp _template.md <feature-name>.md`
2. Fill in the spec — requirements, UI notes, acceptance criteria
3. Open a PR with only the spec file for review
4. Once approved, implement the feature referencing the spec
5. Mark the spec status as `implemented`

## Spec lifecycle

```
draft → review → approved → implemented
```

## Naming

Use lowercase kebab-case matching the route or feature:  
`scholarships-filter.md`, `mentor-booking.md`, `auth-flow.md`
