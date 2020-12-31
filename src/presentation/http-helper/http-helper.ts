import { InternalServerError } from '../errors/internal-server-error'
import { HttpResponse } from '../protocols/http'

const enum STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: STATUS.BAD_REQUEST,
  body: error
})

export const internalServerError = (): HttpResponse => ({
  statusCode: STATUS.INTERNAL_SERVER_ERROR,
  body: new InternalServerError()
})
