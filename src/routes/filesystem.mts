import { FastifyInstance } from 'fastify'

import {
  FILESYSTEM,
  PREFIX
} from '../constants/filesystem.mjs'
import {
  OK,
  saveFile
} from '../controllers/filesystem.mjs'
import { authorize } from '../middleware/authorization.mjs'

export default async function(app: FastifyInstance): Promise<void> {
  app.get(`/${PREFIX}${FILESYSTEM}`, {
    preHandler: authorize
  }, saveFile)
  app.get('/', OK)
}
