export interface iTokenGenerateAble {
    generate(claimData: any): string
}

export interface iTokenParseAble {
    parse(token: string): any
}

export type iToken = iTokenGenerateAble & iTokenParseAble