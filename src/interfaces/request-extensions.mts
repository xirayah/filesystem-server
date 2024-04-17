import { FastifyRequestType } from 'fastify/types/type-provider'

export interface AddFileRequest {
  Body: {
    FILE: Buffer
    AUTH: any
  }
}

export interface GetFileRequest {
  Params: {
    PATH: string
  }
}

export interface UniversalRequest extends AddFileRequest, GetFileRequest {}
