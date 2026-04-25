import type { ReactNode } from 'react'
import '../src/index.css' // your global styles

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}