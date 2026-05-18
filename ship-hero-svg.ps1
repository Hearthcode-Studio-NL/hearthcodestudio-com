# Ship-script: hero SVG → production
# Run dit vanuit hearthcodestudio-com root via PowerShell.
#
# Wat dit doet:
#   1. Cleanup .git/index.lock (stale)
#   2. Reset index om corruption te clearen
#   3. Maak feature branch
#   4. Stage alleen onze echte changes (Hero.tsx + nieuwe SVGs)
#   5. Commit + push

$ErrorActionPreference = 'Stop'

Write-Host "=== Step 1: cleanup stale lock ===" -ForegroundColor Cyan
if (Test-Path .git\index.lock) {
    Remove-Item .git\index.lock -Force
    Write-Host "  removed .git\index.lock"
}

Write-Host ""
Write-Host "=== Step 2: reset index to clear corruption ===" -ForegroundColor Cyan
git reset 2>&1 | Out-Null
Write-Host "  index reset"

Write-Host ""
Write-Host "=== Step 3: create feature branch ===" -ForegroundColor Cyan
git checkout -b feat/hero-svg-logo

Write-Host ""
Write-Host "=== Step 4: stage real changes only ===" -ForegroundColor Cyan
# Hero.tsx (changed: PNG -> SVG)
git add src/components/sections/Hero.tsx

# New SVGs in public/brand/
git add public/brand/logo-full-default.svg
git add public/brand/logo-full-default-leather.svg

# Show what's staged
Write-Host ""
Write-Host "=== Step 5: review what's staged ===" -ForegroundColor Cyan
git diff --cached --stat

Write-Host ""
Write-Host "=== Step 6: commit ===" -ForegroundColor Cyan
git commit `
    -m "feat(hero): replace PNG with true-vector SVG logo" `
    -m "" `
    -m "Hero now uses logo-full-default.svg — a properly traced vector with" `
    -m "viewBox 0 0 1097 1097, 2697 paths, 345 KB gzipped (vs 470 KB PNG)." `
    -m "" `
    -m "Benefits over the previous logo.png:" `
    -m "- Smaller download (345 KB vs 470 KB gzipped)" `
    -m "- Scales perfectly at any zoom level / display density" `
    -m "- No more aspect-[5/4] object-cover crop hack needed" `
    -m "- WCAG 1.4.4 zoom resilience improved" `
    -m "" `
    -m "Also adds logo-full-default-leather.svg as brand-library asset" `
    -m "(forest/leather backdrop variant for non-web contexts)." `
    -m "" `
    -m "Pipeline used to produce these files:" `
    -m "  1. Inkscape Path -> Trace Bitmap on logo-full-transparent.png" `
    -m "  2. Plain SVG export" `
    -m "  3. SVGO optimization" `
    -m "" `
    -m "Hero.tsx changes:" `
    -m "  - src: /brand/logo.png -> /brand/logo-full-default.svg" `
    -m "  - width/height: 1024 -> 1097 (matches SVG viewBox)" `
    -m "  - drop aspect-[5/4] object-cover crop hack" `
    -m "  - add unoptimized prop (next/image skips raster-pipeline for SVG)"

Write-Host ""
Write-Host "=== Step 7: push to GitHub ===" -ForegroundColor Cyan
git push -u origin feat/hero-svg-logo

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Open de PR via de URL die GitHub net teruggaf."
Write-Host ""
Write-Host "CI gates die moeten passeren: prettier, typecheck, eslint, build, lighthouse."
Write-Host "Lighthouse LCP zou iets beter moeten zijn dan voorheen (kleinere download)."
