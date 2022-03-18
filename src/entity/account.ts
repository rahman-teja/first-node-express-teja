export type accountPassword = {
    password: string
    updated_at: Date
}

export type account = {
    _id: string
    name: string
    email: string
    username: string
    phone: string
    kind: number
    is_active: boolean
    password: accountPassword
    created_at: Date
    updated_at: Date
}