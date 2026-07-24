export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.svg?v=2" />
      <link rel="preload" as="image" href="/screens/stasher-firmware-progress.png" />
      <link rel="preload" as="image" href="/screens/stasher-home.png" />
      <meta name="theme-color" content="#050606" />
      <meta name="color-scheme" content="dark light" />

      {/* Social share card. og:title/og:description come from +config, but the
          image has to live here to reach the prerendered pages — absolute URL,
          since crawlers don't resolve relative paths. */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Stasher" />
      <meta property="og:url" content="https://stasherwallet.com/" />
      <meta property="og:image" content="https://stasherwallet.com/stasher-og.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Stasher — Your keys. Your crypto. Offline."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://stasherwallet.com/stasher-og.png" />
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
