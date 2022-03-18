import { registerCommandUsecase } from "../usecase/registerUsecase"
import { accountRepository } from "../repository/account"
import accountModel from "../../models/accountModel"
import { registerHandler } from "../handler/registerHandler"
import { propertyHTPPHandler } from "."

const register = (property: propertyHTPPHandler) => {
    const repo = new accountRepository(accountModel)
    const command = new registerCommandUsecase(repo, property.password)

    return new registerHandler(command).getRouter()
}

export default register