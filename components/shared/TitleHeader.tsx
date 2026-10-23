import {JSX} from "react";

interface Props {
    title: string;
    description: string;
}

export function TitleHeader({title, description}: Props): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-3xl text-white font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}