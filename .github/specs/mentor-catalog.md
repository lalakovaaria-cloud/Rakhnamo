---
title: "Mentor Catalog"
status: implemented
route: /mentors
author: mijgona
date: 2026-03-14
---

# Mentor Catalog

## Goal

Show applicants a list of available mentors so they can find guidance for their study-abroad applications.

## User story

As an **applicant**, I want to browse mentor profiles so that I can find someone with relevant experience to guide me.

## Requirements

- [ ] Display each mentor's name, country/university, and subject area
- [ ] Show a contact or connect button per mentor
- [ ] List is scrollable within the `max-w-sm` phone layout

## UI / UX notes

- Layout: `max-w-sm`, mobile-first vertical card list
- Language: Russian/Tajik labels
- Cards use surface color `#162032`, muted text `#8b9bb4`
- Each card shows avatar placeholder, name, university, field

## Acceptance criteria

- [ ] At least one mentor card renders without errors
- [ ] Card content is readable on a 375px wide screen
- [ ] Tapping the contact button triggers the expected action

## Out of scope

- Search or filter functionality
- Real-time availability status
- Backend API — data is hardcoded

## Open questions

- [x] What fields are required per mentor? → name, university, country, field (resolved)
