import bcrypt from 'bcrypt'
import { iPassword } from "."

export class bcryptEncryptor implements iPassword {
    salt: number
    key: string

    constructor(salt: number, key: string) {
        this.salt = salt
        this.key = key
    }

    async encrpyt(plainPassword: string): Promise<string> {
        try {
            // generate salt to hash password
            const salt = await bcrypt.genSalt(this.salt);

            return await bcrypt.hash(plainPassword, salt)
        } catch (error) {
            throw error
        }
    }
    
    async validate(plainPassword: string, hashPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashPassword)
        } catch (error) {
            throw error
        }
    }

}