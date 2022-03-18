import express from "express"
import { iLoginCommandUsecase } from "../usecase/loginUsecase"
import { buildResponse } from "../../helper"

export class loginHandler {
    router: express.Router

    constructor(command: iLoginCommandUsecase) {
        this.router = express.Router()
    
        this.router.post('/', async function(req: any, res, next) {
          try {
            const { body } = req
      
            const resp = await command.login(body.username, body.password)
            
            buildResponse(res, resp)
          } catch (error: any) {
            next(error)
          }
        })
      }
    
      getRouter(): express.Router {
        return this.router
      }
}