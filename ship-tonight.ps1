# Ship-script: tonight's website tweaks → production
# Run vanuit hearthcodestudio-com root via PowerShell.
#
# Wat dit doet:
#   1. Cleanup stale .git/index.lock
#   2. Reset index om corruption te clearen
#   3. Maakt feature branch
#   4. Stage alleen onze echte changes
#   5. Commit + push
#
# Daarna: open de PR-URL die GitHub teruggeeft, wacht op CI,
#          Squash and Merge.

$ErrorActionPreference = 'Stop'

Write-Host "=== Step 1: cleanup stale lock ===" -ForegroundColor Cyan
if (Test-Path .git\index.lock) {
    Remove-Item .git\index.lock -Force
    Write-Host "  removed .git\index.lock"
}

Write-Host ""
Write-Host "=== Step 2: reset index ===" -ForegroundColor Cyan
git reset 2>&1 | Out-Null
Write-Host "  index reset"

Write-Host ""
Write-Host "=== Step 3: ensure we're on a fresh feature branch ===" -ForegroundColor Cyan
git checkout main 2>&1 | Out-Null
git pull origin main 2>&1 | Out-Null
git checkout -b feat/typography-and-card-uplift

Write-Host ""
Write-Host "=== Step 4: stage real changes ===" -ForegroundColor Cyan
# Hero.tsx — smaller logo + tighter spacing + ring -> border
git add src/components/sections/Hero.tsx
# Work.tsx — carousel + smaller cards + typography
git add src/components/sections/Work.tsx
# Header.tsx — bigger wordmark + bigger nav
git add src/components/layout/Header.tsx
# Approach.tsx — pt-8 pb-16 (less top padding)
git add src/components/sections/Approach.tsx
# Person.tsx — hc-grain class + py-16
git add src/components/sections/Person.tsx
# New project icons
git add public/brand/projects/ 2>$null

Write-Host ""
Write-Host "=== Step 5: review what's staged ===" -ForegroundColor Cyan
git diff --cached --stat

Write-Host ""
Write-Host "=== Step 6: commit ===" -ForegroundColor Cyan
git commit `
    -m "feat(site): typography uplift + project carousel + hero polish" `
    -m "" `
    -m "Reviewer feedback round — bumping legibility and visual hierarchy." `
    -m "" `
    -m "Hero:" `
    -m "  - Logo size clamp(13rem,44vw,25rem) (was 16rem/55vw/32rem) — ~22% smaller" `
    -m "  - Tighter internal spacing: tagline mt-4 (was mt-6), CTA mt-6 (was mt-8)" `
    -m "  - Section bottom pb-6 md:pb-8 (was pb-12 md:pb-16) — half the gap to Approach" `
    -m "  - CTA: ring-1 -> border for predictable subpixel rendering on dark bg" `
    -m "" `
    -m "Header:" `
    -m "  - Wordmark size 1.75rem (was 1.5rem) — more brand presence top-left" `
    -m "  - Nav links text-base (was text-sm), gap-10 (was gap-8) — readable + breathing" `
    -m "" `
    -m "Approach:" `
    -m "  - py-16 -> pt-8 pb-16 — less padding above, normal below" `
    -m "" `
    -m "Person:" `
    -m "  - Added hc-grain class for subtle texture (matches Hero rhythm)" `
    -m "  - py-24 -> py-16 (already in earlier batch)" `
    -m "" `
    -m "Work:" `
    -m "  - Replaced single PUM card with horizontal scroll-snap carousel" `
    -m "  - Three portrait cards: PUM, DAP2D rebuild (placeholder), HearthCode self" `
    -m "  - Cards w-64 md:w-72 (compact), aspect-[5/4] image area, p-4 padding" `
    -m "  - Status labels text-sm font-medium (was text-xs)" `
    -m "  - Card description text-base (was text-sm)" `
    -m "  - Section max-w-5xl (matches Header)" `
    -m "" `
    -m "Project icons added under public/brand/projects/:" `
    -m "  - pum-icon.png (sourced from PUM's icon-512)" `
    -m "  - dap2d-mark.png (sourced from DAP2D project)"

Write-Host ""
Write-Host "=== Step 7: push to GitHub ===" -ForegroundColor Cyan
git push -u origin feat/typography-and-card-uplift

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "GitHub geeft je nu een PR-URL hierboven. Open hem, wacht op CI,"
Write-Host "Squash and Merge."
Write-Host ""
Write-Host "Bekende waivered fails:"
Write-Host "  - CodeQL (GHAS not enabled, ADR-0002)"
Write-Host "  - Lighthouse SEO (noindex middleware on previews, ADR-0003)"
Write-Host "Beide zijn niet-blocking — merge is auto-mergeable."
