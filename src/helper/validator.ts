const emailValidator = (email: string) => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

    return emailRegex.test(email)
}

const phoneValidator = (phone: string) => {
    return true
}

const passwordValidator = (password: string) => {
    return true
}

export {
    emailValidator,
    phoneValidator,
    passwordValidator,
}