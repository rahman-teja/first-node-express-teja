import dotenv from "dotenv"

// get config vars
dotenv.config();

const normalizePort = (val: any) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
      return val;
  }

  if (port >= 0) {
      return port;
  }

  return false;
}

const applicationConfig = {
  port: normalizePort(process.env.APPLICATION_PORT || '8080'),
  name: process.env.APPLICATION_NAME,
  username: process.env.APPLICATION_USERNAME,
  passowrd: process.env.APPLICATION_PASSWORD
}

const loggingConfig = {
  level: process.env.LOG_LEVEL || "dev",
}

const corsConfig = {
  origin: process.env.CORS_ORIGIN || "*",
  maxAge: parseInt(process.env.CORS_MAX_AGE || "300", 10),
}

const jwtConfig = {
  signatureKey: process.env.JWT_SIGNATURE_KEY || "rahmanteja",
  expiration: parseInt(process.env.JWT_EXPIRATION || "900", 10),
  audience: process.env.JWT_AUDIENCE as string,
  issuers: process.env.JWT_ISSUERS as string,
}

const mongoConfig = {
  url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017",
  database: process.env.MONGODB_DATABASE,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
}

const redisConfig = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  dialTimeout: parseInt(process.env.REDIS_DIAL_TIMEOUT || "30", 10),
  readTimeout: parseInt(process.env.REDIS_READ_TIMEOUT || "30", 10),
  writeTimeout: parseInt(process.env.REDIS_WRITE_TIMEOUT || "30", 10),
}

const bcryptConfig = {
  salt: parseInt(process.env.BCRYPT_SALT || "10", 10),
  key: process.env.BCRYPT_KEY || "",
}

const durationConfig = {
  loginDurationInSecond: parseInt(process.env.DURATION_LOGIN_IN_SECOND || "900", 10),
}

export {
  applicationConfig,
  loggingConfig,
  corsConfig,
  jwtConfig,
  mongoConfig,
  redisConfig,
  bcryptConfig,
  durationConfig,
}