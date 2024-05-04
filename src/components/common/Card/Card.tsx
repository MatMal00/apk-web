import { FC, HTMLProps, ReactNode } from "react";
import { CardContent, CardFooter, CardHeader } from "./components";
import { twMerge } from "tailwind-merge";

interface ICardProps {
    children: ReactNode | ReactNode[];
    className?: HTMLProps<HTMLElement>["className"];
}

interface ICardElement extends FC<ICardProps> {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
}

export const Card: ICardElement = ({ children, className }) => {
    return (
        <div className={twMerge("cursor-pointer rounded-lg border bg-white shadow-sm dark:bg-zinc-950", className)}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
