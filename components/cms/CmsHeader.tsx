import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export function CmsHeader() {
    return (
        <header className="bg-background flex h-[70px] items-center justify-between border-b border-line bg-ink px-14">
            <div className="flex items-center gap-6">
                <span className="font-serif text-sm">
          PNS RIDE SRI LANKA <span className="font-sans text-[10px] tracking-[0.2em] text-gold">&nbsp;CMS STUDIO</span>
        </span>
            </div>

            <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="size-2.5 bg-gold"/> Admin Mode
        </span>
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