'use server'

import { redirect } from 'next/navigation'
import {AuthFormState} from "@/features/auth/types";
import {loginSchema} from "@/features/auth/schemas/auth.schema";
import {loginUser, logoutUser} from "@/features/auth/services/auth.service";

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const parsed = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!parsed.success) {
        const f = parsed.error.flatten().fieldErrors
        return { fieldErrors: { email: f.email?.[0], password: f.password?.[0] } }
    }

    const result = await loginUser(parsed.data)
    if (!result.ok) return { error: result.error }

    redirect('/cms/tours')
}

export async function logoutAction() {
    await logoutUser()
    redirect('/cms/login')
}