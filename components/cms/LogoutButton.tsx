import {Button} from "@/components/ui/button";

type Props = { isPending?: boolean, onClick?: () => void }

export function LogoutButton({isPending, onClick}: Props) {
    return <form>
        <Button
            size={"lg"}
            variant="outline"
            disabled={isPending}
            onClick={onClick}
            className="w-full text-xs uppercase tracking-widest"
        >
            Logout
        </Button>
    </form>
}