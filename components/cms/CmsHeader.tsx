export function CmsHeader() {
    return (
        <header className="flex h-[70px] items-center justify-between border-b border-line bg-ink px-14">
            <div className="flex items-center gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted transition hover:text-white"
                >
                    <ArrowLeft size={14}/> Back to site
                </Link>
                <span className="h-6 w-px bg-line"/>
                <span className="font-serif text-2xl">
          Ceylon Luxe <span className="font-sans text-[10px] tracking-[0.2em] text-gold">CMS</span>
        </span>
            </div>

            <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="size-2.5 bg-gold"/> Admin Mode
        </span>
                <form action={logout}>
                    <button className="text-xs uppercase tracking-[0.15em] text-muted transition hover:text-white">
                        Log out
                    </button>
                </form>
            </div>
        </header>
    )
}