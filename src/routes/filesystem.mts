import { FastifyInstance } from 'fastify'

import {
  FILESYSTEM,
  PATH,
  PREFIX
} from '../constants/filesystem.mjs'
import {
  getFile,
  OK,
  saveFile,
  showFiles
} from '../controllers/filesystem.mjs'
import { authorize } from '../middleware/authorization.mjs'

export default async function(app: FastifyInstance): Promise<void> {
  app.post(`/${PREFIX}${FILESYSTEM}`, {
    preHandler: authorize
  }, saveFile)
  app.get(`/:${PATH}`, {
    preHandler: authorize
  }, getFile)
  app.patch(`/:${PATH}`, {
    preHandler: authorize
  }, showFiles)
  app.get('/', OK)
}
