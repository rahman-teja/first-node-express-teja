class OSError implements Error {
  httpCode: number;
  name: string
  stack?: string | undefined
  message: string
  data: any
  meta: any
  
  constructor(http: number, code: string, message: string, data?: any, meta?: any) {
    this.name = code
    this.message = message
    this.httpCode = http
    this.data = data
    this.meta = meta

    Error.captureStackTrace(this, this.constructor)
  }
}

export default OSError