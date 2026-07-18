import type { ReactNode } from 'react'
import '../src/index.css' // your global styles
import { ThemeProvider } from '../src/application/context/ThemeContext'

export default function Layout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
