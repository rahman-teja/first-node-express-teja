import express from "express"
import { iregisterCommandUsecase } from "../usecase/registerUsecase"
import { buildResponse } from "../../helper"

export class registerHandler {
  router: express.Router

  constructor(command: iregisterCommandUsecase) {
    this.router = express.Router()

    this.router.post('/', async function(req: any, res, next) {
      try {
        const { body } = req
  
        const resp = await command.register(body)
        
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
