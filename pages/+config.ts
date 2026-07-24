import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  extends: vikeReact,
  prerender: true,
  title: 'Stasher — Your Crypto, Truly Yours.',
  description: 'Self-custody hardware wallet for Bitcoin, Ethereum, Solana and thousands of coins and tokens. Certified secure element, air-gapped, quantum-resilient — your keys stay offline.',
} satisfies Config
