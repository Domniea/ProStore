export const APP_NAME = process.env.APP_NAME || 'prostore'
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION || 'An ecomerce store built with Next.Js'
export const SERVER_URL = process.env.APP_URL || 'https://localhost:3000'

export const signInDefaultValues = {
    email: 'example@example.com',
    password: 'password'
}

export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}