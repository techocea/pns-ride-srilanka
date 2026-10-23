'use client'

import {Input} from '@/components/ui/input'
import {Field,} from '@/components/ui/field'
import {Button} from '@/components/ui/button'
import {Check, ChevronDown} from "lucide-react";
import {TRAVELER_OPTIONS} from "@/features/inquiries/constants";
import {useInquiryForm} from "@/features/inquiries/hooks/useInquiryForm";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import Link from "next/link";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tourTitle?: string;
    defaults?: { travelDate: string; travelers: string }
}

const base =
    'w-full border border-line bg-accent px-4 text-[15px] text-muted-foreground outline-none transition-colors placeholder:text-white/25 focus:border-gold [color-scheme:dark]'
const textarea = `${base} min-h-[150px] resize-y py-3.5 leading-relaxed`
const control = `${base} h-[52px]`
const travelerLabel = (v: string) => `${v} ${v === '1' ? 'person' : 'people'}`


export function InquiryDialog({open, onOpenChange, tourTitle, defaults}: Props) {
    const { state, formAction, pending, errors:e, reset, formKey } = useInquiryForm(() => {
        // Automatically close dialog on successful submission
        onOpenChange(false)
    })

    const minDate = new Date().toLocaleDateString('en-CA')

    const defaultMessage = tourTitle
        ? `I'm interested in the ${tourTitle} journey. Please help me tailor the experience.`
        : "I'd like help planning my trip."

    const handleOpenChange = (next: boolean) => {
        onOpenChange(next)
        if (!next) reset()
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[92svh] gap-0 overflow-y-auto bg-secondary px-4 py-8 md:p-8 sm:max-w-3xl">
                <DialogHeader className="border-b border-border pb-6">
                    <DialogTitle
                        className="text-primary text-2xl">{tourTitle ? 'Tailor this journey' : 'Plan your trip'}</DialogTitle>
                    <DialogDescription className="text-white">Share your travel plans and we will reply by
                        email.</DialogDescription>
                </DialogHeader>

                {/*{defaults && !result.ok && (*/}
                {/*    <p className="text-xs text-muted-foreground">*/}
                {/*        {defaults.travelDate ? `Preferred date: ${defaults.travelDate} · ` : ''}*/}
                {/*        travelers: {defaults.travelers}*/}
                {/*    </p>*/}
                {/*)}*/}

                {state?.ok ? (
                    <div className="grid justify-items-center gap-4 py-16 text-center">
                          <span className="grid size-12 place-items-center border border-gold text-gold">
                            <Check size={20}/>
                          </span>
                        <p className="font-serif text-white text-3xl">Thank you</p>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            We received your enquiry and will be in touch soon.
                        </p>
                        <Button size="lg" type="button" className="uppercase"
                                onClick={() => onOpenChange(false)}>Close</Button>
                    </div>
                ) : (
                    <form key={formKey} action={formAction} className="pt-8">
                        <input type="hidden" name="tourTitle" value={tourTitle ?? ''}/>

                        {/* honeypot */}
                        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden
                               className="absolute -left-[9999px]"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Name" error={e.name} className="col-span-2 md:col-span-1">
                                <Input name="name" autoComplete="name" placeholder="Alexandra Chen"/>
                            </Field>
                            <Field label="Email" error={e.email} className="col-span-2 md:col-span-1">
                                <Input name="email" type="email" autoComplete="email"
                                       placeholder="alex@example.com"/>
                            </Field>
                            <Field label="Phone / WhatsApp" error={e.phone} className="col-span-2 md:col-span-1">
                                <Input name="phone" type="tel" autoComplete="tel"
                                       placeholder="+94 77 000 0000"/>
                            </Field>
                            <Field label="Preferred travel date" error={e.travelDate}
                                   className="col-span-2 md:col-span-1">
                                <Input name="travelDate" type="date"
                                       min={minDate}
                                       defaultValue={defaults?.travelDate ?? ''}
                                       className={control}/>
                            </Field>
                            <Field label="travelers" error={e.travelers} className="col-span-2">
                                <div className="relative">
                                    <select
                                        name="travelers"
                                        defaultValue={defaults?.travelers ?? '2'}
                                        className={`${control} appearance-none pr-10`}
                                    >
                                        {TRAVELER_OPTIONS.map((o) => (
                                            <option key={o} value={o}>{travelerLabel(o)}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={12}
                                                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold"/>
                                </div>
                            </Field>
                            <Field label="Additional notes" error={e.message} className="col-span-2">
                                <textarea name="message" rows={5}
                                          defaultValue={defaultMessage}
                                          className={textarea}/>
                            </Field>

                            {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}

                            <Button type="submit" size="lg" disabled={pending} className="uppercase col-span-2">
                                {pending ? 'Sending...' : 'Send enquiry'}
                            </Button>

                            <p className="text-xs col-span-2 text-center text-muted-foreground">
                                By sending, you agree to our&nbsp;
                                <Link href="/privacy" target="_blank" className="text-gold underline">Privacy
                                    Policy</Link>.
                            </p>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}