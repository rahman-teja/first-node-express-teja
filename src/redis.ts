import { createClient } from "redis"
import { redisConfig } from "./config"

const redisCon = async (database: number = 0) => {
  const redisClientOpt = {
    url: redisConfig.url,
    // username: redisConfig.username,
    password: redisConfig.password,
    database
  }
  
  const client = createClient(redisClientOpt);
  
  client.on('connect', function() {
    console.info(`Redis ${redisClientOpt.url} on database ${database} Connected!`);
  })

  await client.connect();

  return client
}

export default redisCon