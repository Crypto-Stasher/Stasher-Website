import { AppShell } from '../AppShell.tsx'

// Real vike route for /auth: direct loads (new tab, refresh, bookmark) now
// get a server-rendered page instead of falling through to the 404 page.
export default function Page() {
  return <AppShell ssrLocation="/auth" />
}
