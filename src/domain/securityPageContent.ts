import type { SecurityPageContent } from '@models/SecurityPageContent.type';

// Power-user "/security" page (WEB-6 Phase-2 deep track). Intentional
// disclosures only — claims and standard names, never MCU/SE part numbers,
// PCB layout, test points, or flashing internals (WEB-6 Phase-1 rule).
export const SECURITY_PAGE_CONTENT: SecurityPageContent = {
  kicker: "Security Architecture",
  title: "How Stasher protects your keys",
  intro:
    "A plain, honest account of what Stasher defends against and how. No marketing hand-waving — the real building blocks, named. If a claim isn't here, we don't make it.",
  sections: [
    {
      id: "threat-model",
      kicker: "Threat Model",
      title: "What Stasher defends against — and what it can't",
      body: "Self-custody moves the trust from a company to your own device. We're clear about where that protection starts and stops.",
      items: [
        { title: "Remote attackers", description: "The device holding your keys has no internet, Wi-Fi, or Bluetooth. Attackers on the network cannot reach it." },
        { title: "A compromised phone", description: "The phone app never sees your keys. Malware on your phone cannot move funds — every transaction is confirmed on the device itself." },
        { title: "Physical theft", description: "Keys are sealed in a certified secure element and gated behind your password, with escalating lockout on wrong tries." },
        { title: "Firmware tampering", description: "The device only boots firmware carrying valid signatures, with anti-rollback so old vulnerable firmware can't be forced back on." },
        { title: "What we can't protect", description: "If you lose your 24-word recovery phrase, or hand it (or your password) to someone, no wallet can help. Guard your recovery phrase offline." }
      ]
    },
    {
      id: "secure-element",
      kicker: "Certified Secure Element",
      title: "Keys sealed in a JIL High secure element",
      body: "Private keys are generated on-device and stored inside a dedicated secure element — a tamper-resistant chip certified under Common Criteria to JIL \"High\" attack-potential resistance, the same class of chip trusted in bank cards and passports. The storage key is wrapped by the secure element, so seed material can't be read out even with direct access to the flash.",
    },
    {
      id: "air-gap",
      kicker: "Air-Gap Architecture",
      title: "Two devices, one air gap",
      body: "Stasher splits the job in two. An offline vault device holds your keys, generates addresses, and signs transactions — it never connects to anything. A separate bridge device talks to the internet and relays approved transactions and balance updates. The two exchange messages, never secrets: your keys and the network never share a wire.",
    },
    {
      id: "post-quantum",
      kicker: "Post-Quantum Cryptography",
      title: "Quantum-resilient where it counts",
      body: "Stasher uses NIST post-quantum standards everywhere it controls the cryptography: device pairing runs a hybrid X25519 + ML-KEM-768 key exchange, and secure boot verifies firmware with a dual quorum of Ed25519 and SLH-DSA signatures plus a monotonic anti-rollback epoch. Coin transaction signatures still follow each blockchain's own rules (classical ECDSA / EdDSA) — true of every wallet on the market — but every channel Stasher owns end-to-end is built quantum-resilient today.",
    },
    {
      id: "defense-in-depth",
      kicker: "Defense in Depth",
      title: "Layered protection",
      body: "Security doesn't rest on any single feature.",
      items: [
        { title: "Encrypted at rest", description: "The seed exists in flash only as encrypted entropy — AES-256 with a memory-hard key derivation bound to your password and the device." },
        { title: "Flash readout protection", description: "Production devices enable the microcontroller's readout protection, blocking debug extraction of memory." },
        { title: "Escalating lockout", description: "Wrong password attempts trigger delays that grow from seconds to hours to a full day — brute force becomes impractical." },
        { title: "True hardware randomness", description: "Keys are generated from a hardware random number generator, not predictable software pseudo-randomness." },
        { title: "On-device confirmation", description: "Every transaction is shown on the device's own screen and must be approved with its physical button before it can be signed." }
      ]
    },
    {
      id: "audits",
      kicker: "Independent Assurance",
      title: "Verified, not trusted",
      body: "Independent security experts are reviewing Stasher's hardware and firmware ahead of launch, and we will publish the results. Certification and audit documentation will be linked here as it becomes available.",
    }
  ]
};
