import { usePageContext } from 'vike-react/usePageContext'
import { ErrorPage } from '../../src/presentation/pages/ErrorPage'

// Vike's designated error page (the /pages/_error/ path is the convention).
// Rendered when no route matches (is404) or when a page throws (500).
// `vike prerender` also emits it as dist/client/404.html for nginx to use.
export default function Page() {
  const pageContext = usePageContext()
  return <ErrorPage is404={pageContext.is404 === true} />
}
