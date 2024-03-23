import {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction
} from 'fastify'

import cfg from '../config.mjs'
import { AddFileRequest } from '../interfaces/request-extensions.mjs'

export function authorize(
  request: FastifyRequest<AddFileRequest>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  if (request.body.AUTH !== cfg.SECRET_PASSWORD) {
    return reply.code(403).send('Unauthorized')
  }
  done()
}
