'use client'

import {cn} from '@/lib/utils'
import {Button} from "@/components/ui/button";

type Props = {
    label: string
    tabs: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
}

export function TabBar({label, tabs, value, onChange}: Props) {
    return (
        <div role="group" aria-label={label} className="flex flex-wrap justify-center">
            {tabs.map((t) => (
                <Button
                    variant={value === t.value ? "default" : "outline-gray"}
                    key={t.value}
                    type="button"
                    aria-pressed={value === t.value}
                    onClick={() => onChange(t.value)}
                    className="px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition">
                    {t.label}
                </Button>
            ))}
        </div>
    )
}