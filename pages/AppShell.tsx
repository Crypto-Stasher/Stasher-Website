import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { AuthProvider } from '../src/application/context/AuthContext.tsx'
import App from '../src/App'

const isBrowser = typeof window !== 'undefined'

// Shared by every vike page that hosts the SPA (index, auth). In the browser
// the BrowserRouter reads the real URL; during SSR/prerender there is no URL,
// so each vike page tells StaticRouter which route it stands for.
export function AppShell({ ssrLocation }: { ssrLocation: string }) {
  const router = isBrowser ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <StaticRouter location={ssrLocation}>
      <App />
    </StaticRouter>
  )

  return <AuthProvider>{router}</AuthProvider>
}
