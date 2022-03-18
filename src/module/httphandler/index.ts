import register from "./registerHTTPHandler"
import login from "./loginHTTPHandler"
import { iPassword } from "../../password"
import { iToken } from "../../sessionToken"
import { iSession } from "../../session"

type propertyHTPPHandler = {
    password: iPassword
    token: iToken
    session: iSession
}

export {
    register,
    login,
    propertyHTPPHandler,
}