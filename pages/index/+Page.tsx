import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { AuthProvider } from '../../src/application/context/AuthContext.tsx'
import App from '../../src/App'

const isBrowser = typeof window !== 'undefined'

export default function Page() {
  const router = isBrowser ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <StaticRouter location="/">
      <App />
    </StaticRouter>
  )

  return <AuthProvider>{router}</AuthProvider>
}