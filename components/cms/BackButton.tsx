'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        // If the user came from within the site, go back naturally
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            // Safe fallback if they landed on this page directly
            router.push('/cms/dashboard/tours');
        }
    };

    return (
        <Button
            size="sm"
            variant="ghost"
            onClick={handleBack}
            className="uppercase p-0"
        >
            back
        </Button>
    );
}
