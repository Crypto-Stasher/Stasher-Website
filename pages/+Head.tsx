export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.svg?v=2" />
      <link rel="preload" as="image" href="/screens/stasher-firmware-progress.png" />
      <link rel="preload" as="image" href="/screens/stasher-home.png" />
      <meta name="theme-color" content="#050606" />
      <meta name="color-scheme" content="dark light" />
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
