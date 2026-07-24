import { AppShell } from '../AppShell.tsx'

// Vike route for /security — the power-user deep security page (WEB-6).
// Direct loads (new tab, refresh, bookmark) get a prerendered page instead
// of falling through to the 404.
export default function Page() {
  return <AppShell ssrLocation="/security" />
}
