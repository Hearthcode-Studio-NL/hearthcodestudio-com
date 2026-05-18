import { redirect } from 'next/navigation';

// Redirect /privacy → /nl/privacy (default locale).
// The next-intl proxy handles this normally, but this fallback
// covers direct hits that bypass middleware.
export default function PrivacyRedirect() {
  redirect('/nl/privacy');
}
