import application from "./app"
import mongoConn from "./mongoose"
import redisClient from "./redis"
import { RedisClientType } from "redis"
import http from "http"
import { applicationConfig } from "./config"

(async() => {

  // create db mongoConn()
  const redis1 = await redisClient(1)
  const db = await mongoConn()
  const app = await application(redis1 as RedisClientType)

  app.set("port", applicationConfig.port)
  
  /**
    * Create HTTP server.
  */
  
  var server = http.createServer(app);
  
  server.on('listening', function() {
    console.log(`${applicationConfig.name} Listening on ${applicationConfig.port}`);
  });
  
  server.listen(applicationConfig.port);
  
  process.on('SIGINT', async function() {
    console.log("Caught interrupt signal");
  
    server.close(async function () {
      await db.close(true)
      await redis1.quit()

      console.log(`${applicationConfig.name} Closed`);
      process.exit();
    })
  })
})()