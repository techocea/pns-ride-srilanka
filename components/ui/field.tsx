import React from "react";
import {Label} from "@/components/ui/label";

export const inputClass =
    'w-full border border-line bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-gold'

export function Field({
                          label,
                          error,
                          className,
                          children,
                      }: {
    label: string
    error?: string
    className?: string
    children: React.ReactNode
}) {
    return (
        <Label className={`${className} grid gap-2`}>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}<span
                className="text-red-400 text-xs">&nbsp;*</span></span>
            {children}
            {error && <span className="text-xs text-red-400">{error}</span>}
        </Label>
    )
}