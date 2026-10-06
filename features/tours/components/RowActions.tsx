'use client'

import Link from 'next/link'
import {Eye, EyeOff, Pencil, Trash2} from 'lucide-react'
import {useTourRowActions} from "@/features/tours/hooks/useTourRowActions";
import {Button} from "@/components/ui/button";


const btn =
    'flex size-8 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold disabled:opacity-40'

type Props = { id: string; title: string; draft: boolean }

export function RowActions({id, title, draft}: Props) {
    const {pending, toggle, remove} = useTourRowActions(id, title)

    return (
        <div className="flex gap-2">
            <Link href={`/cms/tours/${id}`} className={btn} aria-label="Edit">
                <Pencil size={14}/>
            </Link>
            <Button type="button" className={btn} disabled={pending} onClick={toggle}
                    aria-label={draft ? 'Show tour' : 'Hide tour'}>
                {draft ? <Eye size={14}/> : <EyeOff size={14}/>}
            </Button>
            <Button variant={"destructive"} type="button" className={btn} disabled={pending} onClick={remove} aria-label="Delete">
                <Trash2 size={14}/>
            </Button>
        </div>
    )
}