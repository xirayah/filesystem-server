import { execSync } from 'child_process'
import {
  FastifyReply,
  FastifyRequest
} from 'fastify'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from 'fs'

import cfg from '../config.mjs'
import {
  MSG_FAIL_ADD,
  MSG_SUCC_ADD
} from '../constants/reply-messages.mjs'
import {
  AddFileRequest,
  GetFileRequest,
  UniversalRequest
} from '../interfaces/request-extensions.mjs'

/**
 * Saves a file to a chosen folder
 * @param request 
 * @param reply 
 * @returns 
 */
export const saveFile = async (
  request: FastifyRequest<AddFileRequest>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  const file = request.body.FILE
  try {
    if (!existsSync(cfg.FILES_LOCATION)) {
      mkdirSync(cfg.FILES_LOCATION)
    }
    writeFileSync(cfg.FILES_LOCATION, file)
  } catch(error) {
    return reply.status(500).send(MSG_FAIL_ADD)
  }
  return await reply.status(200).send(MSG_SUCC_ADD)
}

export const getFile = async (
  request: FastifyRequest<UniversalRequest>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  const path = cfg.FILES_LOCATION + request.params.PATH
  try {
    if (existsSync(path)) {
      const file = readFileSync(path)
      return reply.status(200).send(file)
    }
  } catch(error) {
    return reply.status(500).send('Fail')
  }
  return await reply.status(500).send('')
}

export const showFiles = async (
  request: FastifyRequest<UniversalRequest>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  const res = execSync(`ls ${cfg.FILES_LOCATION}${request.params.PATH}`)
  return await reply.status(200).send(res)
}

/**
 * OK
 * @param request 
 * @param reply 
 * @returns 
 */
export const OK = async (
  request: FastifyRequest<AddFileRequest>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  return await reply.status(200).send('OK')
}
