import { response } from "../../responses"
import { iAccountQueryRepository } from "../repository/account"
import { iPasswordValidator } from "../../password"
import { successCreateBuilder, errorFromOSErrorBuilder } from "../../responses/builder"
import { errorBadValuesBuilder } from "../../osError/builder"
import { iSessionSetter } from "../../session"
import { iTokenGenerateAble } from "../../sessionToken"
import { generateId } from "../../helper/uniqueId"

export interface iLoginCommandUsecase {
    login(username: string, password: string): Promise<response>
}

export type loginCommandProperty = {
    repo: iAccountQueryRepository
    passwordValidator: iPasswordValidator
    session: iSessionSetter
    token: iTokenGenerateAble
}

export class loginCommandUsecase implements iLoginCommandUsecase {
    repo: iAccountQueryRepository
    passwordValidator: iPasswordValidator
    session: iSessionSetter
    token: iTokenGenerateAble

    constructor(prop: loginCommandProperty) {
        this.repo = prop.repo
        this.passwordValidator = prop.passwordValidator
        this.session = prop.session
        this.token = prop.token
    }

    async login(username: string, password: string): Promise<response> {
        let resp: response;

        try {
            const account = await this.repo.GetByUsername(username)

            const validPassword = await this.passwordValidator.validate(
                password, 
                account?.password.password as string
            )

            if (validPassword == false) {
                throw errorBadValuesBuilder("username or password not match")
            }

            // build session
            const accountId = account?._id as string
            const sessionId = generateId("session-")

            // generate jwt token
            const jwtToken = this.token.generate({"session": sessionId})

            // store session
            await this.session.set(sessionId, accountId)
            
            // store account info
            await this.session.set(accountId, JSON.stringify(account))

            // response session id
            resp = successCreateBuilder("", "", jwtToken, null)
        } catch (error: any) {
            throw errorFromOSErrorBuilder(error)
        }

        return resp
    }
}