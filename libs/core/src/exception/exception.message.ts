import { EXCEPTION_TYPE } from './exception-code'

export class CoreException extends Error {
  code: number
  ctx: any

  constructor(code: EXCEPTION_TYPE, message?: string, ctx?: any) {
    super(message ?? EXCEPTION_TYPE[code])

    this.code = code
    this.ctx = ctx
  }
}
