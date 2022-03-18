import { loginCommandUsecase } from "../usecase/loginUsecase"
import { accountRepository } from "../repository/account"
import accountModel from "../../models/accountModel"
import { loginHandler } from "../handler/loginHandler"
import { propertyHTPPHandler } from "."

const login = (property: propertyHTPPHandler) => {
    const repo = new accountRepository(accountModel)
    const commandProperty = {
        repo: repo,
        passwordValidator: property.password,
        session: property.session,
        token: property.token,
    }
    const command = new loginCommandUsecase(commandProperty)

    return new loginHandler(command).getRouter()
}

export default login