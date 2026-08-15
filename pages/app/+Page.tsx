import { AppShell } from '../AppShell.tsx'

// Vike route for /app — the desktop companion app and its downloads.
export default function Page() {
  return <AppShell ssrLocation="/app" />
}
