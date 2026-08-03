import { AppShell } from '../AppShell.tsx'

// Vike route for /product — the dedicated single-product page. Prerendered so
// a direct load (search result, shared link, refresh) never hits the 404.
export default function Page() {
  return <AppShell ssrLocation="/product" />
}
