"use client";

import Link from "next/link";
import {CMS_MENU} from "@/lib/constants";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {AnimatePresence, LayoutGroup, motion} from "motion/react";

const spring = {type: 'spring', stiffness: 500, damping: 40} as const

export function CmsHeader() {
    const pathname = usePathname();
    const [hovered, setHovered] = useState<string | null>(null)

    return (
        <header className="bg-background flex h-[70px] items-center justify-between border-b border-line bg-ink px-14">
            <div className="flex items-center gap-6">
                <span className="font-serif text-sm">
          PNS RIDE SRI LANKA <span className="font-sans text-[10px] tracking-[0.2em] text-gold">&nbsp;CMS STUDIO</span>
        </span>
            </div>

            <LayoutGroup id="cms-nav">
                <nav onMouseLeave={() => setHovered(null)} className="flex gap-8">
                    {CMS_MENU.map((item, idx) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                        return (
                            <Link key={idx} href={item.href}
                                  onMouseEnter={() => setHovered(item.href)}
                                  onFocus={() => setHovered(item.href)}
                                  onBlur={() => setHovered(null)}
                                  className={cn(
                                      'relative flex items-center gap-2 pb-2 text-sm transition-colors hover:text-primary',
                                      isActive && 'text-primary',
                                  )}>
                                <item.icon size={20}/>
                                {item.label}

                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active"
                                        transition={spring}
                                        className="absolute inset-x-0 bottom-0 h-px bg-primary"
                                    />
                                )}

                                <AnimatePresence>
                                    {hovered === item.href && (
                                        <motion.span
                                            layoutId="nav-hover"
                                            transition={spring}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-x-0 bottom-0 h-px bg-primary"
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>
            </LayoutGroup>
            <div>
                <form>
                    <Button
                        variant="outline"
                        className="w-full text-xs uppercase tracking-widest"
                    >
                        Logout
                    </Button>
                </form>
            </div>
        </header>
    )
}