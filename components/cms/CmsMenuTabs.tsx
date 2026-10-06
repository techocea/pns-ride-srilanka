"use client";

import {TABS} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import {useRouter, usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export function CmsMenuTabs() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="grid grid-cols-3 gap-1.5 mb-10 max-w-lg mx-auto">
            {TABS.map(({href, label, icon: Icon}) => {
                const isActive = pathname === href;

                return (
                    <Button
                        size="lg"
                        key={href}
                        variant={isActive ? "default" : "outline"}
                        onClick={() => {
                            router.push(href)
                        }}
                        className="flex items-center gap-2 text-xs"
                    >
                        <Icon size={10}/>
                        {label}
                    </Button>
                )
            })}
        </div>
    )
}