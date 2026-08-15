import type { AppPageContent } from './models/AppPageContent.type';

/**
 * The desktop companion app page (/app).
 *
 * TO PUBLISH A BUILD: set the matching `url` below to the release asset. While
 * a url is null the button renders as "Coming soon" and is not clickable, so
 * the page never links to a download that does not exist.
 *
 * The walkthrough photos live in `public/images/app/`, numbered in the order
 * they are shown. Their captions describe what is on screen in each specific
 * photo, so a swapped image needs its caption rewritten with it.
 */
export const APP_PAGE_CONTENT: AppPageContent = {
  kicker: 'The App',
  title: 'Your everyday screen',
  intro:
    'The Stasher companion app shows every coin you hold, builds transactions, and hands them to the device for approval. It talks to your Stasher X1 over USB — your keys never reach it, and it can never move funds on its own.',

  downloadsTitle: 'Download',
  downloadsNote:
    'Free, and works the same whether or not you bought your device from us. The app is useless without a Stasher X1 in your hand, which is the point.',
  // One button per platform. Splitting Linux into AppImage and .deb rows read
  // as a duplicated button; the format belongs in the detail line, and a second
  // Linux package can be offered from the release page rather than the fold.
  downloads: [
    { platform: 'windows', label: 'Windows', detail: '.exe · 64-bit', url: null },
    { platform: 'linux', label: 'Linux', detail: '.AppImage · x86_64', url: null },
  ],

  walkthroughTitle: 'How it works',
  walkthroughHeading: 'From download to signed',
  // Ordered as the flow actually happens. Each caption describes what is on
  // screen in its own photo — if a photo is ever swapped, the caption has to
  // move with it.
  walkthrough: [
    {
      id: '01',
      title: 'Get the app',
      description:
        'Download the build for your platform from this page. No account, no sign-up, nothing to register.',
      src: '/images/app/01-download.webp',
      alt: 'The Stasher download page open in a browser, with a Stasher X1 on the desk beside the laptop.',
    },
    {
      id: '02',
      title: 'Plug in over USB',
      description:
        'Connect the cable and the app lists the ports it can see. There is no wireless option because the device has no radio.',
      src: '/images/app/02-connect.webp',
      alt: 'Hands plugging a USB-C cable into a Stasher X1 while the app lists available serial devices.',
    },
    {
      id: '03',
      title: 'Pair once',
      description:
        'The device wakes and the two agree on a shared key. Every frame after that is authenticated, so nothing can sit in the middle of the cable.',
      src: '/images/app/03-connected.webp',
      alt: 'The app showing "Device connected" with the tethered Stasher X1 lit up on the desk.',
    },
    {
      id: '04',
      title: 'Updates you can verify',
      description:
        'Firmware arrives over the same cable, and the device checks the signature itself before accepting a single byte.',
      src: '/images/app/04-install.webp',
      alt: 'The app installing firmware on the device, showing a progress bar and a verification notice.',
    },
    {
      id: '05',
      title: 'Build here, approve there',
      description:
        'The app assembles the transaction and the device decodes it independently. You approve on the device screen — not on the screen that could be lying to you.',
      src: '/images/app/05-confirm.webp',
      alt: 'The app waiting on "Confirm on your device" while the held Stasher X1 asks to confirm the transaction.',
    },
    {
      id: '06',
      title: 'Signed, then broadcast',
      description:
        'Signing happens inside the secure element and only the signature comes back. Your keys never crossed the cable.',
      src: '/images/app/06-confirmed.webp',
      alt: 'A green confirmation on both the device screen and the app after the transaction is signed.',
    },
  ],

  // Only what the walkthrough above does not already cover. Pairing and
  // build-here-approve-there used to live here too and were saying the same
  // thing twice on one page.
  features: [
    {
      id: '01',
      title: 'Every coin in one place',
      description:
        'One dashboard for everything you hold, with live balances across every chain the device supports. Read-only by nature: the app can watch your addresses all day and still not spend a satoshi.',
    },
    {
      id: '02',
      title: 'Full history',
      description:
        'Every transaction you have made, with status and confirmations, kept on your own machine rather than an account somewhere.',
    },
  ],

  requirements: [
    'A Stasher X1 — the app does nothing without one',
    'Windows 10 or later, 64-bit',
    'Linux with glibc 2.28 or later, x86_64',
    'A USB-C cable and a free port',
  ],
};
