# Session Clock — hearthcodestudio-com

> Local session clock. Project-scoped Cowork sessions write here.
> Root HearthCode Studio sessions consolidate entries into the master time log.

## How it works

1. **Session start:** Write start time here immediately on first user message.
2. **Session stop:** Write stop time, calculate duration.
3. **Consolidation:** Next root HearthCode Studio session reads this file, adds the entry to `_cowork/time-log.md`, and marks it as processed.
4. **Forgot to close:** Next session backfills from last message timestamp.

All times in **Europe/Amsterdam** (CET/CEST). Use `TZ="Europe/Amsterdam" date` in bash.

---

## Current session

| Field    | Value                 |
| -------- | --------------------- |
| Start    | _(no active session)_ |
| Stop     | _(no active session)_ |
| Duration | —                     |

---

## Unprocessed entries

Entries here have NOT been added to the master time log yet.

| Date | Start | Stop | Duration | Summary |
| ---- | ----- | ---- | -------- | ------- |

---

## Processed entries

_(moved here after consolidation into master time log)_

| Date | Start | Stop | Duration | Summary | Consolidated |
| ---- | ----- | ---- | -------- | ------- | ------------ |
