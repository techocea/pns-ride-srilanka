"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function AuthForm() {
    return (
        <div className="w-full">
            <form
                onSubmit={() => null}
                className="space-y-4 h-full"
            >
                <div className="space-y-2">
                    <Label
                        className="block text-left text-xs text-muted">
                        Email
                    </Label>
                    <Input
                        type="email"
                        autoComplete="username"
                        defaultValue="admin@pnsridesrilanka.com"
                        className=""
                    />
                </div>

                <div className="space-y-2">
                    <Label className="block text-left text-xs text-muted">
                        Password
                    </Label>
                    <Input
                        type="password"
                        autoComplete="current-password"
                        defaultValue="demo-access"
                        className=""
                    />

                </div>

                <Button
                    size={"lg"}
                    type="submit"
                    className="w-full text-xs uppercase tracking-widest"
                >
                    Login
                </Button>
            </form>
            <Button variant={"link"} className="text-gold text-xs mt-6">
                Back to the island
            </Button>
        </div>

    )
}