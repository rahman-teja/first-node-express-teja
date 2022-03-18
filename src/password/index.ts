export interface iPasswordEncryptor {
    encrpyt(plainPassword: string): Promise<string>
}

export interface iPasswordValidator {
    validate(plainPassword: string, hashPassword: string): Promise<boolean>
}

export type iPassword = iPasswordEncryptor & iPasswordValidator