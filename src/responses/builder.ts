import { successResponse, errorResponse } from "."
import OSError from "../osError"

const successCreateBuilder = (code: string, msg: string, data?: any, meta?: any) => {
    return new successResponse(201, code, msg, data, meta)
}

const successOKBuilder = (code: string, msg: string, data?: any, meta?: any) => {
    return new successResponse(200, code, msg, data, meta)
}

const errorFromOSErrorBuilder = (err: OSError) => {
    return new errorResponse(
        err.httpCode,
        err.name,
        err.message,
        err.data,
        err.meta,
    )
}

export {
    successCreateBuilder,
    successOKBuilder,
    errorFromOSErrorBuilder,
}