import {AuthForm} from "@/features/auth/components/AuthForm";
import {getSession} from "@/features/auth/services/auth.service";
import {redirect} from "next/navigation";
import {LockKeyhole} from "lucide-react";

export default async function LoginPage() {
    // if (await getSession()) redirect("/cms/tours")


    return (
        <div className="fixed inset-0 z-[90]  flex items-center justify-center p-6">
            <div className="w-full max-w-md border border-border bg-accent p-8 sm:p-12 text-center">
                <LockKeyhole size={26} className="text-gold mx-auto mb-6"/>
                <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-4">
                    PNS RIDE SRI LANKA · CMS STUDIO
                </p>
                <h1 className="font-serif text-4xl text-white mb-4">
                    Welcome back
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Your journeys, thoughtfully managed.
                </p>
                <AuthForm/>
            </div>
        </div>
    )
}