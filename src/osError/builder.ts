import OSError from "./"
import jsonwebtoken from "jsonwebtoken"

const errorBadValuesBuilder = (msg: string,  data?: any, meta?: any, code: string = "errBadValues") => {
    return new OSError(400, code, msg, data, meta)
}

const errorForbiddenBuilder = (msg: string, data?: any, meta?: any, code: string = "errForbidden") => {
    return new OSError(403, code, msg, data, meta)
}

const errorNotFoundBuilder = (msg: string, data?: any, meta?: any, code: string = "errNotFound") => {
    return new OSError(404, code, msg, data, meta)
}

const errorConflictBuilder = (msg: string, data?: any, meta?: any, code: string = "errConflict") => {
    return new OSError(409, code, msg, data, meta)
}

const errorInternalServerBuilder = (msg: string, data?: any, meta?: any, code: string = "errInternalServer") => {
    return new OSError(500, code, msg, data, meta)
}

const jwtErrorBuilder = (err: any) => {
    if (err instanceof jsonwebtoken.TokenExpiredError) {
        return errorForbiddenBuilder("Token is expired")
    }
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
        return errorInternalServerBuilder("Token error")
    }
    // err should filter mongo error and defined
    return errorForbiddenBuilder("Invalid token")
}

const mongoErrorBuilder = (err: any) => {
    switch (err.name) {
        case "ValidationError":
            let data: any
            let errorMessage = ""
            let i = 0
            for (const key of Object.keys(err.errors)) {
                if (i > 0) {
                    errorMessage += ","
                }

                errorMessage += err.errors[key].message

                data[key] = err.errors[key].message
            }

            return errorBadValuesBuilder(errorMessage, data)
        case "MongoServerError":
            switch (err.code) {
                case 11000:
                    let errorMessage = ""
                    for (const key of Object.keys(err.keyValue)) {
                        errorMessage += `${key} with value ${err.keyValue[key]} `
                    }

                    return errorConflictBuilder(errorMessage + "is duplicate")
            }
    }

    // err should filter mongo error and defined
    return errorInternalServerBuilder("Something when wrong on database!")
}

export {
    errorBadValuesBuilder,
    errorForbiddenBuilder,
    errorNotFoundBuilder,
    errorConflictBuilder,
    errorInternalServerBuilder,
    mongoErrorBuilder,
    jwtErrorBuilder,
}