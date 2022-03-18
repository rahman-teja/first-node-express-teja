import { RedisClientType } from "redis"
import { iSession } from "."

export class sessionRedis implements iSession {
    redistClient: RedisClientType
    durationInSecond: number

    constructor(client: RedisClientType, duration: number) {
        this.redistClient = client
        this.durationInSecond = duration
    }

    async set(key: string, value: string): Promise<string|null> {
        try {
            const opts = {
                EX: this.durationInSecond
            }

            return await this.redistClient.set(key, value, opts)
        } catch (error) {
            throw error
        }
    }

    async get(key: string): Promise<string|null> {
        try {
            return await this.redistClient.get(key)
        } catch (error) {
            throw error
        }
    }
}