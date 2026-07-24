import type { SiteContent } from '@models/SiteContent.type';

export const SITE_CONTENT: SiteContent = {
  hero: {
    tag: "THE AIR-GAPPED HARDWARE WALLET",
    title: "Your crypto, truly yours.",
    description: "Stasher keeps your keys on a device that never goes online. Check every transaction on its screen, approve it in your hand, and keep control for the long term.",
    cta: "Get Stasher",
    networkLoad: "0.042 MS/S"
  },

  trustSignals: {
    items: [
      { label: "Air-Gapped", sub: "Keys never touch the internet" },
      { label: "JIL High", sub: "Certified secure element" },
      { label: "Quantum-Resilient", sub: "Post-quantum pairing & boot" },
      { label: "56+ Coins", sub: "BTC, ETH, SOL & more" },
      { label: "Self-Custody", sub: "Only you hold the keys" }
    ]
  },

  stats: {
    items: [
      { value: "100%", label: "Offline by design" },
      { value: "56+", label: "Supported assets" },
      { value: "2", label: "Devices, one air gap" },
      { value: "JIL", label: "High-rated secure element" }
    ]
  },

  architecture: {
    title: "How Stasher keeps your crypto safe",
    subtitle: "How It Works",
    description: "Two small devices work together. One holds your money and stays offline. The other helps it talk to the internet, without ever seeing your secrets. Your money and the internet never share the same wire.",
    zones: [
      {
        zone: "OFFLINE DEVICE",
        color: "var(--accent-cyan)",
        machines: [
          { name: "THE VAULT", role: "Where Your Money Lives", detail: "Your crypto is created and kept here. Nothing ever leaves this device. It is completely offline — no WiFi, no Bluetooth, no internet." },
          { name: "THE LOCK", role: "Certified Secure Element", detail: "Your keys sit inside a tamper-resistant secure element rated JIL High — the same class of chip trusted in bank cards and passports. Your secret can't be pulled out, even by someone holding the device." }
        ]
      },
      {
        zone: "BRIDGE DEVICE",
        color: "var(--accent-yellow)",
        machines: [
          { name: "THE MESSENGER", role: "The Go-Between", detail: "This one talks to the internet. It sends your approved transactions and brings back balance updates over a quantum-resilient paired link. It never sees your secrets." }
        ]
      },
      {
        zone: "PHONE APP",
        color: "var(--accent-blue)",
        machines: [
          { name: "STASHER APP", role: "Your Everyday Screen", detail: "A friendly app for iPhone and Android. See your coins, start transactions, and connect to your Stasher — all in one place." }
        ]
      }
    ]
  },

  security: {
    title: "Built like a vault",
    subtitle: "Why It's Safe",
    description: "Every layer is designed so that even if something goes wrong, your crypto stays yours. Your secrets never leave the device. Even if your phone gets hacked, your crypto is fine.",
    features: [
      {
        id: "01",
        title: "Never Online",
        description: "The part of Stasher that holds your money has no internet, no Bluetooth, no WiFi. Hackers on the other side of the world cannot reach it — because it is simply not connected to anything.",
        icon: "AIRGAP"
      },
      {
        id: "02",
        title: "Sealed in a Certified Chip",
        description: "Your 24-word backup is sealed inside a certified secure element rated JIL High — a tamper-resistant chip built to resist physical attack. Nobody can pull it out — not thieves, not strangers, not even us at Stasher.",
        icon: "AES256"
      },
      {
        id: "03",
        title: "You See Every Move",
        description: "Before anything sends, the Stasher screen shows you exactly what is about to happen. You press the button on the device to approve. No surprises, no tricks.",
        icon: "VERIFY"
      },
      {
        id: "04",
        title: "Locks Out Thieves",
        description: "If someone finds your Stasher, it locks them out after a few wrong tries — first seconds, then hours, then a full day. Plenty of time to rescue your crypto with your backup phrase.",
        icon: "LOCK"
      }
    ]
  },

  howItWorks: {
    title: "Sending crypto takes three steps",
    subtitle: "How it works",
    steps: [
      { step: 1, label: "Choose", description: "Open the app, pick what to send and who gets it.", zone: "hot" },
      { step: 2, label: "Confirm on your Stasher", description: "Check the details on the device screen and press the button to approve. Your secret never leaves the device.", zone: "cold" },
      { step: 3, label: "Done", description: "Your Stasher signs it and the app sends it. Your crypto is on its way — safely.", zone: "hot" }
    ]
  },

  differentiators: {
    title: "Why Stasher",
    items: [
      {
        id: "01",
        label: "OFFLINE",
        title: "Always Offline",
        description: "Other wallets plug into your phone or computer when they sign — for a moment, your crypto is close to the internet. The Stasher device holding your money never connects to anything. Hackers cannot reach what is not online. Not even Stasher can."
      },
      {
        id: "02",
        label: "FUTURE-PROOF",
        title: "Quantum-Resilient",
        description: "Stasher already uses next-generation, post-quantum encryption to pair your devices and to verify its own firmware — the new standards built to survive future quantum computers. Future-proof from day one, no panic upgrade."
      },
      {
        id: "03",
        label: "TWO-PART",
        title: "Two Devices Working As One",
        description: "One device guards your crypto. The other talks to the internet. They pass messages, never secrets. A setup other wallets don't have — your money and the web never share the same wire."
      },
      {
        id: "04",
        label: "MANY COINS",
        title: "56+ Coins on One Device",
        description: "Bitcoin, Ethereum, Solana, and 50+ others — all held on one small device. Lose it? A simple 24-word backup phrase restores everything, on any compatible wallet."
      }
    ]
  },

  products: {
    title: "One device. Your crypto, truly yours.",
    subtitle: "The Device",
    tiers: [
      {
        id: "consumer",
        name: "STASHER",
        tagline: "The Personal Crypto Safe",
        highlight: true,
        features: [
          "Perfect for first-time buyers, long-term savers, traders, and families",
          "Certified secure element (JIL High) guards your keys",
          "Keeps your crypto offline where hackers cannot reach it",
          "Works with 56+ popular coins: Bitcoin, Ethereum, Solana, and more",
          "Quantum-resilient pairing and secure boot",
          "Free app for iPhone and Android",
          "Simple 24-word backup — if you lose the device, you recover everything",
          "Small screen and button so you see and approve every transaction",
          "Password-protected and locks itself against thieves",
          "You own your crypto — Stasher has no access to it, ever",
          "Works the same even if Stasher the company disappeared"
        ]
      }
    ]
  },

  appShowcase: {
    title: "The Stasher app",
    subtitle: "Your Everyday Screen",
    description: "A friendly phone app that shows all your crypto in one place. Send money to a friend, pay someone, or move funds around — a few taps and a press on the Stasher device, and you are done. Your crypto stays safe on the device. Your phone just helps you use it.",
    features: [
      { title: "All Your Coins in One Place", description: "See every coin you own in one clear dashboard with up-to-date balances." },
      { title: "Send in a Few Taps", description: "Pick a coin, type how much, choose who receives it. Check on the device. Done." },
      { title: "Pair Once, Use Forever", description: "Connect your phone to your Stasher the first time. From then on, they remember each other." },
      { title: "Full History", description: "Every transaction you have ever made, with clear status and confirmations." }
    ],
    downloadLinks: [
    ]
  },

  comparison: {
    title: "How Stasher compares",
    subtitle: "Stasher vs. Others",
    competitors: ["Ledger Nano X", "Trezor Safe 5"],
    rows: [
      { feature: "Always stays offline (never touches the internet)", stasher: "Yes", competitor1: "No", competitor2: "No" },
      { feature: "Quantum-resilient pairing & secure boot", stasher: "Yes", competitor1: "No", competitor2: "No" },
      { feature: "Separate bridge device for the internet", stasher: "Yes", competitor1: "No", competitor2: "No" },
      { feature: "Shows every transaction on its own screen", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Needs a button press to approve", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Standard 24-word backup phrase", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Truly random, one-of-a-kind keys", stasher: "Yes", competitor1: "Yes", competitor2: "No" },
      { feature: "Backup locked behind your password", stasher: "Yes", competitor1: "Partial", competitor2: "No" },
      { feature: "Free phone app", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Coins supported", stasher: "56+", competitor1: "5,500+", competitor2: "9,000+" },
      { feature: "Certified secure element (JIL High)", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Protects against password guessing", stasher: "Locks out longer each try", competitor1: "Wipes after 3", competitor2: "Wipes after 16" }
    ]
  },

  openSource: {
    title: "Verified, not trusted",
    subtitle: "Independent Assurance",
    description: "You shouldn't have to take our word for it. Your keys live in a certified secure element, and the device is going through independent security review before launch.",
    points: [
      { title: "Certified Secure Element", description: "Your keys are held in a secure element certified to JIL High attack-potential resistance — the same class of tamper-resistant chip trusted in bank cards and passports." },
      { title: "Independent Audits", description: "Independent security experts are reviewing Stasher's hardware and firmware ahead of launch, and we will publish the results." }
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
        answer: "A powerful new kind of computer — a quantum computer — may one day break some of today's encryption. Stasher already uses post-quantum cryptography everywhere it controls: the secure link between your two devices and the check that verifies its own firmware both run on next-generation, quantum-resistant standards. (Coin signatures themselves follow each blockchain's own rules — true for every wallet on earth — but everything Stasher owns end-to-end is built quantum-resilient today.)"
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
        question: "How is Stasher different from Ledger or Trezor?",
        answer: "Ledger and Trezor need to plug into your phone or computer when they approve a transaction — so for a moment, your crypto is close to the internet. Stasher splits this into two devices: one always stays offline with your crypto, another handles the internet. They never mix. Stasher also uses post-quantum cryptography to pair its devices and verify its firmware, which Ledger and Trezor do not."
      },
      {
        question: "Which coins can I store on Stasher?",
        answer: "Over 56 popular coins, including Bitcoin, Ethereum, Solana, XRP, Litecoin, Cardano, and Polkadot. We add new ones regularly."
      },
      {
        question: "Can Stasher the company see or touch my money?",
        answer: "No. We make the device, but your crypto belongs only to you. You are the only one with the password and backup phrase. Nobody at Stasher can access, freeze, or move your money. Even if our company vanished tomorrow, your crypto would still be safe and usable."
      },
      {
        question: "What if my phone gets hacked or stolen?",
        answer: "Your crypto is still safe. The secret code that controls your money is only on the Stasher device — never on your phone. Your phone is just a screen that helps you use Stasher. A stolen or hacked phone cannot move a single coin, because nothing happens without you pressing the button on the Stasher itself."
      },
      {
        question: "How do I know the device is really trustworthy?",
        answer: "You don't have to take our word for it. Your keys are held in a certified secure element rated JIL High — the same class of tamper-resistant chip used in bank cards and passports. Independent security experts are reviewing Stasher's hardware and firmware ahead of launch, and we will publish the results."
      }
    ]
  },

  assets: {
    title: "Coins you can store",
    items: ["BITCOIN", "ETHEREUM", "SOLANA", "XRP", "POLKADOT", "LITECOIN", "CARDANO", "50+ MORE"]
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
