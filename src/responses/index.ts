interface response {
    GetHTTP(): number;
    GetCode(): string;
    GetData(): any;
    GetMeta(): any;
    GetMessage(): string;
    GetError(): Error;
}

class successResponse implements response {
  message: string;
  code: string;
  data: any;
  meta: any;
  httpCode: number;

  constructor(http: number, code: string, message: string, data: any, meta: any) {
    this.message = message
    this.httpCode = http
    this.code = code
    this.data = data
    this.meta = meta
  }

  GetHTTP(): number {
    return this.httpCode
  }
  GetCode(): string {
    return this.code;
  }
  GetData() {
    return this.data
  }
  GetMeta() {
    return this.meta;
  }
  GetMessage(): string {
    return this.message
  }
  GetError(): Error {
    throw new Error("Method not implemented.");
  }
}

class errorResponse implements response {
  httpCode: number;
  name: string
  message: string
  data: any
  meta: any

  constructor(http: number, code: string, message: string, data: any, meta: any) {
    this.name = code
    this.message = message
    this.httpCode = http
    this.data = data
    this.meta = meta
  }

  GetHTTP(): number {
    return this.httpCode
  }
  GetCode(): string {
    return this.name
  }
  GetData() {
    return this.data
  }
  GetMeta() {
    return this.meta
  }
  GetMessage(): string {
    return this.message
  }
  GetError(): Error {
    return this
  }
}

export {
  response,
  successResponse,
  errorResponse,
}