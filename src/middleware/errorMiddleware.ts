import { response, errorResponse } from "../responses"
import { errorInternalServerBuilder } from "../osError/builder"
import { errorFromOSErrorBuilder } from "../responses/builder"
import { buildResponse } from "../helper"

const errorMiddleware = (err: any, _: any, res: any, next: any) => {
    let resp: response = errorFromOSErrorBuilder(
        errorInternalServerBuilder("something went wrong")
    )

    if (err instanceof errorResponse) {
        resp = err as response
    }

    buildResponse(res, resp)
}

export default errorMiddleware