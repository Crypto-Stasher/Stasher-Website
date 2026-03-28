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
      { name: "GitHub", url: "https://github.com/Crypto-Stasher", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
      { name: "X", url: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> },
      { name: "Discord", url: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg> },
      { name: "Telegram", url: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
      { name: "Reddit", url: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg> },
      { name: "YouTube", url: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> }
    ]
  }
};
