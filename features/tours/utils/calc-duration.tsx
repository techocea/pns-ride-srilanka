export const calcDurationNights = (days: number): string => {
    if (days <= 1) return "0 Nights";
    if (days === 2) return "1 Night";
    return `${days - 1} Nights`;
};