import jwt from "jsonwebtoken"
import { jwtErrorBuilder } from "../osError/builder"
import { iToken } from "."

export class tokenJWT implements iToken {
    key: string
    audience: string
    issuer: string
    algorithm: jwt.Algorithm
    expiredInSecond: number

    constructor(
        key: string,
        audience: string,
        issuer: string,
        algorithm: jwt.Algorithm,
        expiredInSecond: number
    ) {
        this.key = key
        this.audience = audience
        this.issuer = issuer
        this.algorithm = algorithm
        this.expiredInSecond = expiredInSecond
    }

    generate(claimData: any): string {
        try {
            const opts = {
                algorithm: this.algorithm,
                expiresIn: this.expiredInSecond * 60,
            }
    
            claimData["iss"] = this.issuer
            claimData["aud"] = this.audience
    
            return jwt.sign(claimData, this.key, opts)
        } catch (error) {
            throw jwtErrorBuilder(error)
        }
    }
    
    parse(token: string) {
        try {
            const verifyOptions = {
                algorithm: this.algorithm,
                audience: this.audience,
                issuer: this.issuer,
            }
        
            return jwt.verify(token, this.key, verifyOptions)
          } catch (error) {
            throw jwtErrorBuilder(error)
          }
    }
}