export interface iSessionSetter {
    set(key: string, value: string): Promise<string|null>
}

export interface iSessionGetter {
    get(key: string): Promise<string|null>
}

export type iSession = iSessionGetter & iSessionSetter