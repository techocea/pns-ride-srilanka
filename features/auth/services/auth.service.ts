import "server-only";

import {cookies, headers} from "next/headers";
import {getPayloadClient} from "@/lib/payload";
import {redirect} from "next/navigation";
import {LoginInput} from "@/features/auth/schemas/auth.schema";

export async function getSession() {
    const payload = await getPayloadClient();
    const {user} = await payload.auth({headers: await headers()})
    return user;
}

//call in every service which requires authentication
export async function requireUser() {
    const payload = await getPayloadClient();
    const {user} = await payload.auth({headers: await headers()});
    if (!user) redirect("/cms/login")
    return {payload, user}
}

export async function loginUser(input: LoginInput): Promise<{ ok: true } | { ok: false; error: string }> {
    const payload = await getPayloadClient();

    try {
        const result = await payload.login({collection: "users", data: input})
        if (!result.token) return {ok: false, error: "Login Failed"}

        const cookieStore = await cookies();
        cookieStore.set(`${payload.config.cookiePrefix}-token`, result.token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            expires: result.exp ? new Date(result.exp * 1000) : undefined,
        })
        return {ok: true}
    } catch {
        return {ok: false, error: 'Invalid email or password'}
    }
}

export async function logoutUser() {
    const payload = await getPayloadClient()
    const cookieStore = await cookies()
    cookieStore.delete(`${payload.config.cookiePrefix}-token`)
}