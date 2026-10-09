import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CMS_MENU} from "@/lib/constants";

export function CmsHeader() {
    return (
        <header className="bg-background flex h-[70px] items-center justify-between border-b border-line bg-ink px-14">
            <div className="flex items-center gap-6">
                <span className="font-serif text-sm">
          PNS RIDE SRI LANKA <span className="font-sans text-[10px] tracking-[0.2em] text-gold">&nbsp;CMS STUDIO</span>
        </span>
            </div>

            <nav className="flex gap-8">
                {CMS_MENU.map((item, idx) => (
                    <Link key={idx} href={item.href} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                        <item.icon size={20}/>
                        {item.label}
                    </Link>
                ))}
            </nav>
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