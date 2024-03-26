import fastify, {
  FastifyInstance,
  FastifyServerOptions
} from 'fastify'
import {
  dirname,
  join
} from 'path'
import { fileURLToPath } from 'url'

import fastifyAutoload from '@fastify/autoload'
import fastifyMultipart from '@fastify/multipart'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const build = async (opts: FastifyServerOptions): Promise<FastifyInstance> => {
  const app = fastify(opts)
  await app.register(fastifyMultipart)
  app.register(fastifyAutoload, {
    dir: join(__dirname, 'routes')
  })
  return app
}
