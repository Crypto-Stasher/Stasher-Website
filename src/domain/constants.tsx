import type { SiteContent } from '@models/SiteContent.type';

export const SITE_CONTENT: SiteContent = {
  hero: {
    title: "Your crypto, truly yours.",
    description: "Stasher keeps your keys on a device that never goes online. Check every transaction on its screen, approve it in your hand, and keep control for the long term.",
    cta: "Get Stasher"
  },

  differentiators: {
    title: "Why Stasher",
    items: [
      {
        id: "01",
        label: "FUTURE-PROOF",
        title: "Quantum-resilient",
        description: "Next-generation encryption, already built in. Infrastructure ready for the future."
      },
      {
        id: "02",
        label: "CERTIFIED",
        title: "Certified secure element (JIL High)",
        description: "Your keys live in a certified secure element rated JIL High — a dedicated chip that protects secrets, sealed off from the rest of the device."
      },
      {
        id: "03",
        label: "TWO-IN-ONE",
        title: "Cold and hot wallet in one",
        description: "Most people need both a cold wallet and a hot wallet. Stasher is both — fully separated, in your pocket."
      },
      {
        id: "04",
        label: "DO MORE",
        title: "A full financial stack",
        description: "Swap, stake, and grow your crypto right from your wallet — every move signed on hardware you're holding."
      },
      {
        id: "05",
        label: "MANY COINS",
        title: "5,000+ coins and tokens",
        description: "Bitcoin, Ethereum, Solana, Monero, XRP, Cardano, every major L2, and thousands of tokens across 62 chains."
      },
      {
        id: "06",
        label: "FORM FACTOR",
        title: "Pocket-sized",
        description: "40 × 62 × 9 mm. Thicker than a credit card, smaller than your phone."
      }
    ]
  },

  faq: {
    title: "Frequently asked questions",
    subtitle: "FAQ",
    items: [
      {
        question: "I'm new to crypto — what exactly is Stasher?",
        answer: "Stasher is a small device — about the size of a thick credit card — that keeps your crypto safe. Think of it like a tiny safe you can carry. Your crypto lives inside the device, not on the internet, so hackers cannot steal it. You use a friendly phone app to see your balances and send money, and press a button on the device whenever you approve a move."
      },
      {
        question: "Why do I need a device? Can't I just keep my crypto in an app?",
        answer: "You can, but apps on phones and computers are connected to the internet — which means hackers, viruses, or a stolen phone can steal your crypto. A device like Stasher stays offline, so there is no way for anyone on the internet to reach your money. It's the difference between leaving cash on your desk and locking it in a safe."
      },
      {
        question: "Is Stasher hard to use if I've never done this before?",
        answer: "Not at all. If you can use a banking app, you can use Stasher. The phone app walks you through every step. To send crypto: you pick what to send, check the details on the device screen, press the button, done. No commands, no code, no complicated words."
      },
      {
        question: "What does 'quantum-resilient' mean? Should I worry?",
        answer: "A powerful new kind of computer — a quantum computer — may one day break some of today's encryption. Stasher already uses post-quantum cryptography everywhere it controls: the secure link between its cold and warm halves and the check that verifies its own firmware both run on next-generation, quantum-resistant standards. (Coin signatures themselves follow each blockchain's own rules — true for every wallet on earth — but everything Stasher owns end-to-end is built quantum-resilient today.)"
      },
      {
        question: "Who is Stasher for?",
        answer: "Anyone who owns crypto and wants it safe. Someone buying their first Bitcoin. Someone saving for retirement. A trader who wants safety without slowing down. A parent setting money aside for their kids' future. If you hold crypto and care about keeping it, Stasher is for you."
      },
      {
        question: "What if I lose the device?",
        answer: "Your money is completely safe. When you first set up Stasher, you write down 24 special words (your 'backup phrase'). As long as you keep those 24 words somewhere safe — ideally on paper in a drawer or a safe, not on your computer — you can restore all your crypto onto a new Stasher in minutes."
      },
      {
        question: "What makes Stasher different?",
        answer: "Stasher splits the job in two. A cold side holds your keys and never touches a network. A warm side handles the internet. They share one platform but are separated by cryptography, not just by wiring: the cold side only ever emits a signed result, and your secrets have no path out. On top of that, the device pairing and the firmware check both run on post-quantum standards, so the parts Stasher controls end to end are built for the long term."
      },
      {
        question: "Which coins can I store on Stasher?",
        answer: "Thousands, across 62 blockchains. That includes Bitcoin, Ethereum, Solana, Monero, XRP, Litecoin, Cardano, Polkadot and Tron, every EVM network like Arbitrum, Base, Optimism and Polygon, and the tokens on them — stablecoins such as USDT and USDC plus thousands of others. We add new ones regularly."
      },
      {
        question: "Can Stasher the company see or touch my money?",
        answer: "No. We make the device, but your crypto belongs only to you. You are the only one with the password and backup phrase. Nobody at Stasher can access, freeze, or move your money. Even if our company vanished tomorrow, your crypto would still be safe and usable."
      },
      {
        question: "What if my phone gets hacked or stolen?",
        answer: "Your crypto is still safe. The secret code that controls your money is only on the Stasher device — never on your phone. Your phone is just a screen that helps you use Stasher. A stolen or hacked phone cannot move a single coin, because nothing happens without you pressing the button on the Stasher itself."
      }
    ]
  },

  newsletter: {
    title: "Stay in the loop",
    description: "Launch news, helpful tips, and early access — no spam, ever.",
    placeholder: "your@email.com",
    cta: "SUBSCRIBE"
  },

  footer: {
    transmission: "Offline security, made simple.",
    copyright: "\u00A9 2026 Stasher \u00B7 Keep your crypto safe, offline \u00B7 All rights reserved",
    socials: [
      { name: "GitHub", url: "https://github.com/Crypto-Stasher", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg> },
    ]
  }
};
