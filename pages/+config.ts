import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  extends: vikeReact,
  prerender: true,
  title: 'Stasher — Your Keys. Your Crypto. Offline.',
  description: 'Hardware-isolated multi-chain custody.',
} satisfies Config