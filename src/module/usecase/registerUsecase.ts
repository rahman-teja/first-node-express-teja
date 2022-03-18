import { register } from "../../appmodel/register"
import { response } from "../../responses"
import { successCreateBuilder, errorFromOSErrorBuilder } from "../../responses/builder"
import { iAccountCommandRepository } from "../repository/account"
import { accountKindBuyer } from '../../constants/accountKind'
import { iPasswordEncryptor } from "../../password"
import { generateId } from "../../helper/uniqueId"

export interface iregisterCommandUsecase {
    register(payload: register): Promise<response>
}

export class registerCommandUsecase implements iregisterCommandUsecase {
    repo: iAccountCommandRepository
    passwordEncryptor: iPasswordEncryptor

    constructor(repo: iAccountCommandRepository, passwordEncryptor: iPasswordEncryptor) {
        this.repo = repo
        this.passwordEncryptor = passwordEncryptor
    }

    async register(payload: register): Promise<response> {
        let resp: response;

        try {
            const nowUtc = new Date()

            const password = await this.passwordEncryptor.encrpyt(payload.password)

            const accountPassword = {
                password: password,
                updated_at: nowUtc,
            }

            const registeredAccount = {
                _id: generateId(),
                name: payload.name,
                email: payload.email,
                username: payload.username,
                phone: payload.phone,
                kind: accountKindBuyer,
                is_active: true,
                password: accountPassword,
                created_at: nowUtc,
                updated_at: nowUtc,
            }

            const res = await this.repo.Create(registeredAccount)

            resp = successCreateBuilder("", "", res._id, null)
        } catch (error: any) {
            throw errorFromOSErrorBuilder(error)
        }

        return resp
    }
}