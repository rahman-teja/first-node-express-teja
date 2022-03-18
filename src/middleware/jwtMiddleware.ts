import { buildResponse } from "../helper"
import { jwtErrorBuilder, errorForbiddenBuilder } from "../osError/builder"
import { errorFromOSErrorBuilder } from "../responses/builder"
import { response } from "../responses"
import { iTokenParseAble } from "../sessionToken"
import { iSessionGetter } from "../session"

const jwtMiddleware = (tokenParseAble: iTokenParseAble, sessionGetter: iSessionGetter) => {
  return async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
  
      if (token == null) {
        throw errorForbiddenBuilder("Invalid token")
      }
  
      const data = tokenParseAble.parse(token)
      const session = await sessionGetter.get(data.session)

      if (session == null) {
        throw errorForbiddenBuilder("Invalid token")
      }
  
      next()
    } catch (error) {
      let resp: response = errorFromOSErrorBuilder(
        jwtErrorBuilder(error)
      )
  
      buildResponse(res, resp)
    }
  }
}

export default jwtMiddleware