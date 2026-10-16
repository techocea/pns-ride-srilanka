type Args = { number: string; tourTitle: string; travelDate: string; travelers: string }

export function buildWhatsAppUrl({ number, tourTitle, travelDate, travelers }: Args) {
    const lines = [
        `Hi! I'm interested in "${tourTitle}".`,
        travelDate && `Preferred date: ${travelDate}`,
        `Travellers: ${travelers}`,
    ].filter(Boolean)

    return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`
}