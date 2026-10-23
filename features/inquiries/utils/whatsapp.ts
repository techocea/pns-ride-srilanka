type Args = {
    number: string;
    customerName?: string;
    tourTitle: string;
    travelDate: string;
    travelers: string;
}

export function buildWhatsAppUrlCustomer({number, tourTitle, travelDate, travelers}: Args) {
    const lines = [
        `Hi! I'm interested in "${tourTitle}".`,
        travelDate && `Preferred date: ${travelDate}`,
        `Travellers: ${travelers}`,
    ].filter(Boolean)

    return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`
}

export function buildWhatsAppUrlAdmin({ number, customerName, tourTitle, travelDate, travelers }: Args) {
    const lines = [
        `Hello ${customerName},`,
        `Thank you for reaching out to us! This is regarding your recent inquiry for "${tourTitle || 'our services'}".`,
        travelDate && `Preferred Date: ${travelDate}`,
        travelers && `Travelers: ${travelers}`,
        `\nWe would love to help you finalize your booking. Please let us know if these details are correct so we can proceed!`
    ].filter(Boolean);

    return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`;
}