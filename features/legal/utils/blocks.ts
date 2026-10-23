import type {LegalBlock} from "@/features/legal/types";

export const p = (text: string): LegalBlock => ({ type: 'p', text })
export const ul = (...items: string[]): LegalBlock => ({ type: 'ul', items })