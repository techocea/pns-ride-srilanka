import {useActionState} from "react";
import {AuthFormState} from "@/features/auth/types";
import {loginAction} from "@/features/auth/actions/auth.actions";

export function useLoginForm() {
    const [state, formAction, pending] = useActionState<AuthFormState, FormData>(loginAction, {})
    return { state, formAction, pending }
}