import { usePageContext } from 'vike-react/usePageContext'
import { SITE_CONTENT } from '../src/domain/constants'

const ORIGIN = 'https://stasherwallet.com'

// Canonical/og:url must name the page itself, not the site. nginx serves the
// prerendered routes as directories (bare /security 301s to /security/), so the
// canonical form carries the trailing slash.
function canonicalFor(urlPathname: string): string {
  if (urlPathname === '/') return `${ORIGIN}/`
  return `${ORIGIN}${urlPathname.replace(/\/+$/, '')}/`
}

// Structured data is derived from SITE_CONTENT rather than duplicated: Google
// requires FAQ markup to match the FAQ actually rendered, and a hand-kept copy
// drifts the first time the visible copy changes.
function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SITE_CONTENT.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stasher',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/favicon.svg`,
  sameAs: ['https://github.com/Crypto-Stasher'],
}

// No `offers` block: there is no price yet, and an offer without one is invalid
// for rich results as well as a claim we can't stand behind. Add it with the
// real price when checkout ships.
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Stasher Hardware Wallet',
  description:
    'Air-gapped hardware cryptocurrency wallet with a certified JIL High secure element. Your keys never touch the internet.',
  brand: { '@type': 'Brand', name: 'Stasher' },
  category: 'Hardware Wallet',
}

export default function Head() {
  const pageContext = usePageContext()
  const canonical = canonicalFor(pageContext.urlPathname)
  const isHome = pageContext.urlPathname === '/'
  const isProduct = pageContext.urlPathname.replace(/\/+$/, '') === '/product'

  return (
    <>
      <link rel="icon" href="/favicon.svg?v=2" />
      <link rel="preload" as="image" href="/screens/stasher-firmware-progress.png" />
      <link rel="preload" as="image" href="/screens/stasher-home.png" />
      <meta name="theme-color" content="#050606" />
      <meta name="color-scheme" content="dark light" />

      <link rel="canonical" href={canonical} />

      {/* Social share card. og:title/og:description come from +config, but the
          image has to live here to reach the prerendered pages — absolute URL,
          since crawlers don't resolve relative paths. */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Stasher" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${ORIGIN}/stasher-og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Stasher — Your keys. Your crypto. Offline."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${ORIGIN}/stasher-og.png`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Product and FAQ markup belong only where that content exists. Repeating
          FAQ markup on pages with no visible FAQ is a structured-data violation,
          not a bonus. */}
      {(isHome || isProduct) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {isHome && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
        />
      )}

      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
            let theme = 'dark';
            try {
              const saved = localStorage.getItem('theme');
              theme = saved === 'light' || saved === 'dark'
                ? saved
                : matchMedia('(prefers-color-scheme: light)').matches
                  ? 'light'
                  : 'dark';
            } catch {
              theme = matchMedia('(prefers-color-scheme: light)').matches
                ? 'light'
                : 'dark';
            }
            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;
            document.querySelector('meta[name="theme-color"]')
              ?.setAttribute('content', theme === 'light' ? '#f1efe7' : '#050606');
          })();`,
        }}
      />
    </>
  )
}
