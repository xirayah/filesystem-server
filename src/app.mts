import fastify, {
  FastifyInstance,
  FastifyServerOptions
} from 'fastify'
import { join } from 'path'

import fastifyAutoload from '@fastify/autoload'
import fastifyMultipart from '@fastify/multipart'

export const build = async (opts: FastifyServerOptions): Promise<FastifyInstance> => {
  const app = fastify(opts)
  await app.register(fastifyMultipart)
  app.register(fastifyAutoload, {
    dir: join(__dirname, 'routes')
  })
  return app
}
