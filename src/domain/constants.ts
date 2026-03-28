import type { SiteContent } from './models/SiteContent.type';

export const SITE_CONTENT: SiteContent = {
  hero: {
    tag: "HARDWARE-ISOLATED COLD STORAGE",
    title: "YOUR KEYS. YOUR CRYPTO. OFFLINE.",
    description: "Stasher is an air-gapped hardware wallet built for people who refuse to compromise on security. Your private keys are generated, stored, and sign transactions on a device that never touches the internet.",
    cta: "GET STASHER",
    networkLoad: "0.042 MS/S"
  },

  stats: {
    items: [
      { value: "56+", label: "Supported Cryptocurrencies" },
      { value: "0", label: "Security Breaches" },
      { value: "100%", label: "Air-Gapped Signing" },
      { value: "24", label: "Word Seed Recovery" }
    ]
  },

  architecture: {
    title: "COLD + WARM ARCHITECTURE",
    subtitle: "How Stasher Works",
    description: "Two dedicated devices working together. The cold wallet holds your keys in complete isolation. The warm wallet bridges the gap to the blockchain — without ever accessing your secrets.",
    zones: [
      {
        zone: "COLD WALLET",
        color: "var(--accent-cyan)",
        machines: [
          { name: "SECURE_CORE", role: "Key Storage & Signing", detail: "Private keys generated and stored in encrypted flash. All transaction signing happens here — fully offline." },
          { name: "CRYPTO_ENGINE", role: "Hardware Cryptography", detail: "Dedicated hardware accelerators for AES-256, SHA-256, and true random number generation." }
        ]
      },
      {
        zone: "WARM WALLET",
        color: "var(--accent-yellow)",
        machines: [
          { name: "NETWORK_BRIDGE", role: "Blockchain Relay", detail: "Connects to the internet to broadcast signed transactions and fetch chain data. Never handles private keys." }
        ]
      },
      {
        zone: "MOBILE APP",
        color: "var(--accent-blue)",
        machines: [
          { name: "STASHER_APP", role: "User Interface", detail: "iOS & Android app for portfolio management, transaction initiation, and secure BLE communication with your wallet." }
        ]
      }
    ]
  },

  security: {
    title: "DEFENSE IN DEPTH",
    subtitle: "Security Model",
    description: "Every layer is designed to fail safely. Your keys never leave the cold wallet. Even if the warm wallet or your phone is compromised, your funds remain untouchable.",
    features: [
      {
        id: "01",
        title: "True Air-Gap Isolation",
        description: "The cold wallet has no WiFi, no Bluetooth, no USB data. Signed transactions are transferred via a secure one-way protocol. Your keys physically cannot reach the internet.",
        icon: "AIRGAP"
      },
      {
        id: "02",
        title: "Encrypted Seed Storage",
        description: "Your 24-word seed is encrypted with AES-256-CBC and authenticated with HMAC. Password-derived keys use PBKDF2 with 10,000 iterations. Seeds are device-bound and cannot be extracted.",
        icon: "AES256"
      },
      {
        id: "03",
        title: "Hardware Random Number Generation",
        description: "Keys are generated using a FIPS 140-2 compliant true random number generator built into the hardware. No pseudo-random shortcuts.",
        icon: "TRNG"
      },
      {
        id: "04",
        title: "On-Screen Verification",
        description: "Every transaction is displayed on the wallet's built-in screen. Physical button press required to confirm. No blind signing — you verify destination and amount before every transaction.",
        icon: "VERIFY"
      },
      {
        id: "05",
        title: "Brute-Force Protection",
        description: "Exponential lockout delays after failed password attempts — from 10 seconds up to 24 hours. Protects against physical theft and unauthorized access.",
        icon: "LOCK"
      },
      {
        id: "06",
        title: "Secure Memory Management",
        description: "Sensitive data is held in protected memory regions and securely zeroed after every operation. No key material is ever persisted beyond what's needed.",
        icon: "MEMORY"
      }
    ]
  },

  howItWorks: {
    title: "HOW A TRANSACTION WORKS",
    subtitle: "Transaction Flow",
    steps: [
      { step: 1, label: "INITIATE", description: "Open the Stasher mobile app and create a transaction — choose asset, amount, and destination", zone: "hot" },
      { step: 2, label: "TRANSFER", description: "Transaction details are sent to the cold wallet via secure BLE connection", zone: "dmz" },
      { step: 3, label: "VERIFY", description: "Cold wallet displays the full transaction on its built-in screen for your review", zone: "cold" },
      { step: 4, label: "CONFIRM", description: "Press the hardware button to authorize. The cold wallet signs the transaction offline", zone: "cold" },
      { step: 5, label: "SIGN", description: "Private key derives the correct chain key via BIP44, signs the transaction, then wipes from memory", zone: "cold" },
      { step: 6, label: "RELAY", description: "Signed transaction is passed to the warm wallet, which connects to the blockchain network", zone: "dmz" },
      { step: 7, label: "BROADCAST", description: "Warm wallet broadcasts the signed transaction to the network", zone: "hot" },
      { step: 8, label: "DONE", description: "You receive confirmation in the mobile app once the transaction is on-chain", zone: "hot" }
    ]
  },

  differentiators: {
    title: "WHY STASHER",
    items: [
      {
        id: "01",
        label: "SECURITY",
        title: "True Air-Gap",
        description: "Unlike wallets that connect via USB or Bluetooth for signing, Stasher's cold wallet is physically isolated. Your keys exist in a vault that has no path to the internet."
      },
      {
        id: "02",
        label: "STANDARD",
        title: "Full BIP Support",
        description: "BIP39 seed generation, BIP32 hierarchical derivation, BIP44 multi-coin paths. Your wallet is recoverable with any standard 24-word compatible wallet if needed."
      },
      {
        id: "03",
        label: "MULTI-CHAIN",
        title: "56+ Cryptocurrencies",
        description: "Native support for Bitcoin (Legacy & SegWit), Ethereum (EIP-1559), Solana, and 50+ more via SLIP44 registered coin types. One device, all your assets."
      },
      {
        id: "04",
        label: "MOBILE",
        title: "Seamless Experience",
        description: "The Stasher mobile app gives you a modern portfolio view, transaction history, and one-tap signing flow — all communicating securely with your hardware wallet."
      }
    ]
  },

  products: {
    title: "FROM PERSONAL TO INSTITUTIONAL",
    subtitle: "Product Lineup",
    tiers: [
      {
        id: "consumer",
        name: "STASHER",
        tagline: "Personal Cold Wallet",
        highlight: true,
        features: [
          "Air-gapped cold wallet hardware device",
          "Warm wallet bridge for blockchain connectivity",
          "BIP39/BIP32/BIP44 full standard compliance",
          "56+ cryptocurrencies (BTC, ETH, SOL, ...)",
          "Mobile app for iOS & Android",
          "Secure BLE communication",
          "AES-256-CBC encrypted seed storage",
          "FIPS 140-2 hardware random number generator",
          "Built-in screen for transaction verification",
          "Physical button confirmation for signing"
        ]
      },
      {
        id: "enterprise",
        name: "STASHER ENTERPRISE",
        tagline: "Institutional Custody Platform",
        features: [
          "6-machine distributed signing architecture",
          "3-of-3 heterogeneous key fragmentation",
          "Physical air-gap with DMZ relay",
          "Quantum-resistant lattice cryptography",
          "Maker/Checker governance workflows",
          "M-of-N configurable quorum rules",
          "Hash-chained immutable audit trails",
          "Dual auth: HMAC-SHA256 + Argon2id/FIDO2",
          "Prometheus metrics & Kubernetes-ready",
          "Multi-chain: BTC, ETH, SOL, XRP, DOT, ..."
        ]
      }
    ]
  },

  appShowcase: {
    title: "THE STASHER APP",
    subtitle: "Companion App",
    description: "A modern mobile app that puts you in full control. Manage your portfolio, initiate transactions, and communicate securely with your hardware wallet — all from your phone.",
    features: [
      { title: "Portfolio Overview", description: "Track all your assets across 56+ chains in one clean dashboard with real-time balances." },
      { title: "One-Tap Transactions", description: "Select asset, enter amount and destination — the app handles the rest with your hardware wallet." },
      { title: "Secure BLE Pairing", description: "Encrypted Bluetooth Low Energy connection with L2CAP channels. Pair once, transact securely." },
      { title: "Transaction History", description: "Full on-chain history for every wallet, with status tracking and confirmation alerts." },
      { title: "Multi-Wallet Management", description: "Connect and manage multiple Stasher devices from a single app." },
      { title: "Address Book", description: "Save trusted addresses for quick and safe repeat transactions." }
    ],
    downloadLinks: [
      { platform: "iOS", url: "#" },
      { platform: "Android", url: "#" }
    ]
  },

  comparison: {
    title: "STASHER VS. THE COMPETITION",
    subtitle: "Comparison",
    competitors: ["Ledger Nano X", "Trezor Safe 5"],
    rows: [
      { feature: "True Air-Gap (no USB/BT signing)", stasher: "Yes", competitor1: "No", competitor2: "No" },
      { feature: "Dedicated Warm Wallet Bridge", stasher: "Yes", competitor1: "No", competitor2: "No" },
      { feature: "On-Device Screen Verification", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Physical Button Confirmation", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "BIP39/BIP32/BIP44 Support", stasher: "Full", competitor1: "Full", competitor2: "Full" },
      { feature: "Hardware RNG (FIPS 140-2)", stasher: "Yes", competitor1: "Yes", competitor2: "No" },
      { feature: "Encrypted Seed Storage (AES-256)", stasher: "Yes", competitor1: "Partial", competitor2: "No" },
      { feature: "Companion Mobile App", stasher: "Yes", competitor1: "Yes", competitor2: "Yes" },
      { feature: "Multi-Chain Support", stasher: "56+", competitor1: "5,500+", competitor2: "9,000+" },
      { feature: "Enterprise / Institutional Tier", stasher: "Yes", competitor1: "Yes", competitor2: "No" },
      { feature: "Open-Source Firmware", stasher: "Yes", competitor1: "Partial", competitor2: "Yes" },
      { feature: "Brute-Force Lockout", stasher: "Exponential", competitor1: "Wipe after 3", competitor2: "Wipe after 16" }
    ]
  },

  techStack: {
    title: "BUILT FOR MAXIMUM SECURITY",
    subtitle: "Technology",
    items: [
      { name: "C", detail: "Bare-metal cold wallet firmware", category: "FIRMWARE" },
      { name: "C++", detail: "Warm wallet bridge firmware", category: "FIRMWARE" },
      { name: "React Native", detail: "Mobile wallet app (iOS/Android)", category: "MOBILE" },
      { name: "Rust", detail: "Enterprise cold signing nodes & DMZ", category: "ENTERPRISE" },
      { name: "Go", detail: "Enterprise API & policy engine", category: "ENTERPRISE" },
      { name: "React + TypeScript", detail: "Enterprise dashboard", category: "FRONTEND" },
      { name: "Protocol Buffers", detail: "Inter-node communication", category: "PROTOCOL" },
      { name: "AES-256 / SHA-256", detail: "Hardware-accelerated cryptography", category: "CRYPTO" },
      { name: "TLS 1.3 / mTLS", detail: "All network links, pinned CA", category: "SECURITY" },
      { name: "BLE L2CAP", detail: "Secure mobile-to-wallet comms", category: "COMMS" }
    ]
  },

  openSource: {
    title: "OPEN & VERIFIABLE",
    subtitle: "Transparency",
    description: "We believe security through obscurity is no security at all. Stasher's firmware and protocol code are open source — anyone can audit, verify, and contribute.",
    points: [
      { title: "Open-Source Firmware", description: "The cold wallet firmware is published on GitHub. Review every line that handles your keys." },
      { title: "Reproducible Builds", description: "Build the firmware yourself from source and verify it matches what ships on the device." },
      { title: "Security Audits", description: "Independent third-party audits of the cryptographic implementation and hardware design." },
      { title: "Bug Bounty Program", description: "Responsible disclosure rewarded. Help us find vulnerabilities before they become threats." }
    ]
  },

  compliance: {
    title: "COMPLIANCE & GOVERNANCE",
    description: "Designed for the most regulated environments, meeting the highest standards of financial security and operational auditability.",
    points: [
      "SOC2 Type II Ready Architecture",
      "FIPS 140-2 Hardware Security",
      "Full Deterministic Audit Trails",
      "Quantum-Resistant Commitment Paths",
      "RBAC with Granular Permissions",
      "Instant Session Revocation"
    ]
  },

  faq: {
    title: "FREQUENTLY ASKED QUESTIONS",
    subtitle: "FAQ",
    items: [
      {
        question: "Why do I need a hardware wallet?",
        answer: "Software wallets (on your phone or computer) store your private keys on internet-connected devices, making them vulnerable to malware, phishing, and remote attacks. A hardware wallet keeps your keys on a dedicated offline device, so even if your phone or computer is compromised, your crypto remains safe."
      },
      {
        question: "What happens if I lose my Stasher device?",
        answer: "Your funds are safe. During setup, Stasher generates a standard 24-word BIP39 recovery seed. As long as you have this seed backed up securely, you can restore your entire wallet on a new Stasher device — or any BIP39-compatible wallet."
      },
      {
        question: "How is Stasher different from Ledger or Trezor?",
        answer: "Stasher uses a true air-gap architecture with a separate cold wallet and warm wallet. Unlike Ledger or Trezor, the device that holds your keys has zero connectivity — no USB data, no Bluetooth, no WiFi. The warm wallet handles internet connectivity separately and never has access to your private keys."
      },
      {
        question: "What cryptocurrencies does Stasher support?",
        answer: "Stasher natively supports 56+ cryptocurrencies including Bitcoin (Legacy & SegWit), Ethereum (EIP-1559), Solana, and many more via the SLIP44 standard. We're continuously adding support for new chains."
      },
      {
        question: "Is the firmware open source?",
        answer: "Yes. The cold wallet firmware and communication protocol are published on GitHub. You can audit the code yourself, build from source to verify the binary matches your device, and contribute improvements."
      },
      {
        question: "What if my phone is hacked?",
        answer: "Your keys are never on your phone. The Stasher mobile app only initiates and displays transactions — all signing happens on the air-gapped cold wallet after you physically verify and confirm on the device screen. A compromised phone cannot steal your funds or sign unauthorized transactions."
      },
      {
        question: "How does the cold wallet communicate without internet?",
        answer: "The cold wallet communicates with the warm wallet through a secure one-way data transfer protocol. Transaction data is passed to the cold wallet for signing, and only the signed transaction (which is safe to broadcast publicly) is returned. The private keys never leave the cold device."
      },
      {
        question: "What is Stasher Enterprise?",
        answer: "Stasher Enterprise is our institutional-grade custody platform designed for organizations managing large amounts of digital assets. It features a 6-machine distributed signing architecture with quantum-resistant key fragmentation, governance workflows, and compliance-ready audit trails. Contact us for a demo."
      }
    ]
  },

  assets: {
    title: "MULTI-CHAIN NATIVE SUPPORT",
    items: ["BTC.MAINNET", "ETH.EVM.L1", "SOL.CLUSTER", "XRP.LEDGER", "DOT.RELAY", "LTC.MAINNET", "ADA.CARDANO", "50+ MORE"]
  },

  newsletter: {
    title: "STAY IN THE LOOP",
    description: "Get launch updates, security advisories, and early access to new features.",
    placeholder: "your@email.com",
    cta: "SUBSCRIBE"
  },

  footer: {
    transmission: "END OF TRANSMISSION",
    copyright: "\u00A9 2026 STASHER // HARDWARE COLD CUSTODY // ALL RIGHTS RESERVED",
    socials: [
      { name: "GitHub", url: "https://github.com/Crypto-Stasher", icon: "GH" },
      { name: "X", url: "#", icon: "X" },
      { name: "Discord", url: "#", icon: "DC" },
      { name: "Telegram", url: "#", icon: "TG" },
      { name: "Reddit", url: "#", icon: "RD" },
      { name: "YouTube", url: "#", icon: "YT" }
    ]
  }
};
