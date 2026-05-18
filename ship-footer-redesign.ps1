# Ship-script: footer redesign + social icons → production
# Run dit vanuit de root van hearthcodestudio-com via PowerShell.
#
# Wat dit doet:
#   1. Verwijdert stale .git/index.lock
#   2. Maakt een feature branch
#   3. Stage ALLEEN onze echte wijzigingen (geen phantom CRLF diffs)
#   4. Commit + push
#
# WAT DIT NIET DOET:
#   - De phantom CRLF/LF diffs aanraken (~10 files met whitespace-only "changes")
#   - Die lossen we later op met een .gitattributes commit

$ErrorActionPreference = 'Stop'

Write-Host "=== Step 1: cleanup stale lock ===" -ForegroundColor Cyan
if (Test-Path .git\index.lock) {
    Remove-Item .git\index.lock -Force
    Write-Host "  removed .git\index.lock"
} else {
    Write-Host "  no lock file present"
}

Write-Host ""
Write-Host "=== Step 2: create feature branch ===" -ForegroundColor Cyan
git checkout -b feat/footer-redesign-and-social-icons

Write-Host ""
Write-Host "=== Step 3: stage real changes only ===" -ForegroundColor Cyan
# Real content changes (Footer + Contact)
git add src/components/layout/Footer.tsx
git add src/components/sections/Contact.tsx

# New social icons (untracked)
git add public/brand/icons/

# File moves (delete + new) — old PNGs deleted, Archive folder added
git add public/brand/Archive/
git add -u public/brand/logo-leather.png public/brand/logo-mark.png

Write-Host ""
Write-Host "=== Step 4: review what's staged ===" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "=== Step 5: commit ===" -ForegroundColor Cyan
git commit `
    -m "feat(footer): redesign with social icons and 3-col grid layout" `
    -m "" `
    -m "- Move social links from Contact.tsx to Footer.tsx (conventional placement)" `
    -m "- Add brand-themed social icons (GitHub, LinkedIn, Instagram) at 48px display" `
    -m "- 3-column grid on md+: legal info | icons centered | privacy/a11y links" `
    -m "- All footer text uniform: gold-accent color, text-sm, no underlines" `
    -m "- Hover-glow on links matches header navlink pattern (subtle gold halo)" `
    -m "- Replace <p> with <div> in legal block to escape brand-tokens p{} overrides" `
    -m "- Inline style={textDecoration:'none'} on <abbr> tags kills browser dotted underline" `
    -m "" `
    -m "Archive: moved unused logo-leather.png, logo-mark.png to public/brand/Archive/." `
    -m "Source files: 1254x1254 brand-themed icon masters in HearthCode-Vault/06-Brand-Assets/social/source/."

Write-Host ""
Write-Host "=== Step 6: push to GitHub ===" -ForegroundColor Cyan
git push -u origin feat/footer-redesign-and-social-icons

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Open de PR via de URL die GitHub net teruggaf."
Write-Host ""
Write-Host "Wat je nu nog moet doen:"
Write-Host "  1. Open de PR-URL"
Write-Host "  2. CI gates afwachten (dep-audit, prettier, eslint, typecheck, lighthouse)"
Write-Host "  3. Als alles groen is: Squash & Merge"
Write-Host "  4. Vercel deployt automatisch naar productie"
