"use client";

import {Button} from "@/components/ui/button";
import {useLoginForm} from "@/features/auth/hooks/useLoginForm";
import {Field, inputClass} from "@/components/ui/field";

export function AuthForm() {
    const {state, formAction, pending, errors: e} = useLoginForm();

    return (
        <div className="w-full">
            <form
                action={formAction}
                className="space-y-4 h-full"
            >
                <Field label="Email" error={e.email}>
                    <input name="email" className={inputClass}/>
                </Field>

                <Field label="Password" error={e.password}>
                    <input name="password" className={inputClass}/>
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
                Back to the island
            </Button>
        </div>

    )
}