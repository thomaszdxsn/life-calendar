import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'
import containerQueriesPlugin from '@tailwindcss/container-queries'

const config: Pick<Config, 'prefix' | "presets" | "content" | "theme" | 'plugins'> = {
  content: ["./src/**/*.tsx"],
  // prefix: "ui-",
  presets: [
    sharedConfig
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "52": "repeat(52, minmax(0, 1fr))"
      }
    }
  },
  plugins: [
    containerQueriesPlugin
  ]
}

export default config