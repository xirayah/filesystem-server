import 'dotenv/config'

import { build } from './app.mjs'

const start = async () => {
  const app = await build({ logger: true })
  try {
    await app.listen({
      host: process.env.HOST || '0.0.0.0',
      port: Number(process.env.HOST) || 3333
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

