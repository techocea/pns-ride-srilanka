"use client";

import {Button} from "@/components/ui/button";
import {useLoginForm} from "@/features/auth/hooks/useLoginForm";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import Link from "next/link";

export function AuthForm() {
    const {state, formAction, pending, errors: e} = useLoginForm();

    return (
        <div className="w-full">
            <form
                action={formAction}
                className="space-y-4 h-full text-left"
            >
                <Field label="Email" error={e.email}>
                    <Input name="email"/>
                </Field>

                <Field label="Password" error={e.password}>
                    <Input name="password"/>
                </Field>

                {state.error && <p className="text-sm text-red-400">{state.error}</p>}

                <Button
                    size={"lg"}
                    disabled={pending}
                    type="submit"
                    className="w-full text-xs uppercase tracking-widest"
                >
                    {pending ? 'Please Wait...' : 'Login'}
                </Button>
            </form>

            <Button variant={"link"} className="text-gold text-xs mt-6">
                <Link href={"/"}> Back to the island</Link>
            </Button>
        </div>

    )
}