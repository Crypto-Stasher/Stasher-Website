import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  extends: vikeReact,
  prerender: true,
  title: 'Stasher — Your Crypto, Truly Yours.',
  description: 'An air-gapped hardware wallet that keeps your keys offline and every approval in your hands.',
} satisfies Config
