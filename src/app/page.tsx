import { redirect } from 'next/navigation';

// The next-intl proxy redirects / to /nl/ before this page renders.
// This fallback exists only as a safety net.
export default function RootPage() {
  redirect('/nl');
}
