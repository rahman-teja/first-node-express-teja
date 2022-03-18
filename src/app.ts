import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { RedisClientType } from "redis"
import * as handler from "./module/httphandler"
import * as middleware from "./middleware"
import { 
  loggingConfig,
  durationConfig,
  bcryptConfig,
  jwtConfig
} from "./config"
import { sessionRedis } from "./session/sessionRedis"
import { bcryptEncryptor } from "./password/passwordBcrypt"
import { tokenJWT } from "./sessionToken/sessionTokenJWT"

const app = async (redisClient: RedisClientType) => {
  const app = express();

  const session = new sessionRedis(redisClient, durationConfig.loginDurationInSecond)
  const password = new bcryptEncryptor(bcryptConfig.salt, bcryptConfig.key)
  const token = new tokenJWT(jwtConfig.signatureKey,
    jwtConfig.audience,
    jwtConfig.issuers,
    "HS256",
    jwtConfig.expiration,
  )

  const httphandlerProperty = {
    session,
    password,
    token,
  }
  
  const loggedMiddleware = [
    middleware.jwtMiddleware(token, session),
  ]

  // const user = userHandler(express.Router())
  app.use(logger(loggingConfig.level))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(middleware.corsMiddleware)

  // UNLOGGED
  app.get("/app-service/api/health-check", (_, res) => res.send("success"));
  app.use("/app-service/api/v1/account-register", handler.register(httphandlerProperty));
  app.use("/app-service/api/v1/account-login", handler.login(httphandlerProperty));

  // LOGGED
  // app.use("/app-service/api/v1/account", loggedMiddleware, handler.login(httphandlerProperty))

  app.use(middleware.errorMiddleware);

  return app
}

export default app;