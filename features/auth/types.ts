export type AuthFormState = {
    error?: string
    fieldErrors?: Partial<Record<'email' | 'password', string>>
}