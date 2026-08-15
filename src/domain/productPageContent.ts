import type { ProductPageContent } from './models/ProductPageContent.type';

// The dedicated single-product page (/product). Content lives here rather than
// in SITE_CONTENT because none of it is rendered on the homepage — the homepage
// keeps only the short product teaser that links here.
//
// Spec figures are deliberately conservative: no MCU or secure-element part
// numbers (WEB-6 attack-surface rule), and anything not yet frozen for
// production is labelled as preliminary rather than stated as final.
export const PRODUCT_PAGE_CONTENT: ProductPageContent = {
  kicker: 'The Device',
  name: 'Stasher X1',
  tagline: 'The personal crypto safe.',
  intro:
    'One small device holds your keys, shows you every transaction on its own screen, and waits for your finger before anything is signed. Cold and warm live on the same platform, separated by cryptography — so the side that touches the internet never touches your keys.',
  availability: 'Not on sale yet — reserving is free and commits you to nothing.',
  // Only what the device itself does. The security architecture (secure
  // element, cold/warm separation, post-quantum) is argued once on the
  // homepage and stated here as facts in the spec table — never re-explained.
  features: [
    {
      id: '01',
      title: 'A screen that answers to you',
      description:
        'Before anything is signed, the device decodes the transaction itself and renders it as a sentence you can read — amount, recipient, network, token transfers and all. It works this out on its own hardware rather than trusting what the phone hands it, so a compromised phone cannot lie to you about what you are approving. No opaque blob of hex, ever.',
    },
    {
      id: '02',
      title: 'Nothing signs without a press',
      description:
        'Approval is a physical button on the device. There is no software path to it, so nothing remote can supply the press for you — malware can ask, but only your thumb can answer.',
    },
    {
      id: '03',
      title: 'Locks out anyone who finds it',
      description:
        'Wrong passwords cost more each time: seconds, then minutes, then hours, then a full day. Flash readout protection is enabled and secrets are held encrypted at rest, so taking the device apart is no shortcut. That buys you the time to move your funds with your backup phrase.',
    },
    {
      id: '04',
      title: 'Yours even if we disappear',
      description:
        'Stasher X1 generates a standard 24-word recovery phrase. It restores on any compatible wallet, from any vendor. There is no account, no server, no permission to ask for — we could vanish tomorrow and your crypto would be untouched.',
    },
  ],

  inTheBox: [
    'Stasher X1 device',
    'USB-C charging and update cable',
    'Two recovery-phrase cards',
    'Tamper-evident seal',
    'Quick-start guide',
  ],

  specGroups: [
    {
      group: 'Device',
      specs: [
        { name: 'Dimensions', value: '40 × 62 × 9 mm' },
        { name: 'Display', value: 'Colour TFT, on-device transaction review' },
        { name: 'Input', value: 'Physical confirm button' },
        { name: 'Connector', value: 'USB-C (charging and firmware updates)' },
        { name: 'Companion app', value: 'Windows and Linux desktop, free' },
      ],
    },
    {
      group: 'Security',
      specs: [
        { name: 'Secure element', value: 'Certified, JIL High attack-potential resistance' },
        { name: 'Key storage', value: 'Sealed in the secure element; never exported' },
        { name: 'Cold/warm boundary', value: 'Authenticated messages only — no key path across' },
        { name: 'Encryption at rest', value: 'AES-256' },
        { name: 'Password hardening', value: 'PBKDF2 and Argon2id' },
        { name: 'Random numbers', value: 'Hardware true random number generator' },
        { name: 'Readout protection', value: 'Enabled — flash cannot be dumped in the clear' },
        { name: 'Brute-force defence', value: 'Exponential lockout, 10 seconds up to 24 hours' },
      ],
    },
    {
      group: 'Cryptography',
      specs: [
        { name: 'Device pairing', value: 'Hybrid classical + post-quantum key exchange' },
        { name: 'Secure boot', value: 'Dual-signature with a post-quantum half, plus anti-rollback' },
        { name: 'Transaction signing', value: 'Per-chain standards (ECDSA / EdDSA)' },
        { name: 'Message authentication', value: 'HMAC-SHA256' },
      ],
    },
    {
      group: 'Backup & recovery',
      specs: [
        { name: 'Recovery phrase', value: '24 words, industry standard' },
        { name: 'Restores on', value: 'Any compatible wallet, any vendor' },
        { name: 'Passphrase', value: 'Optional, adds a hidden wallet' },
      ],
    },
    {
      group: 'Assets',
      specs: [
        { name: 'Blockchains', value: '62, including every EVM network' },
        { name: 'Coins & tokens', value: 'Thousands, with new ones added regularly' },
      ],
    },
  ],

  assets: {
    title: 'Coins you can store',
    // Eight fills the four-column grid exactly; a ragged last row of empty
    // bordered cells reads as a rendering fault.
    items: [
      'BITCOIN',
      'ETHEREUM',
      'SOLANA',
      'MONERO',
      'XRP',
      'LITECOIN',
      'CARDANO',
      '1000s MORE',
    ],
  },
};
