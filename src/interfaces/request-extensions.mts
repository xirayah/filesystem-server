import { FastifyRequestType } from 'fastify/types/type-provider'

export interface AddFileRequest {
  Body: {
    FILE: Buffer
    AUTH: any
  }
}
