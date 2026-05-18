import { redirect } from 'next/navigation';

// Redirect /toegankelijkheidsverklaring to /nl/toegankelijkheidsverklaring.
// The next-intl proxy handles this normally, but this fallback
// covers direct hits that bypass middleware.
export default function AccessibilityRedirect() {
  redirect('/nl/toegankelijkheidsverklaring');
}
