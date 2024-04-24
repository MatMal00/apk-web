import { FC, HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICardFooterProps {
    children: ReactNode | ReactNode[];
    className?: HTMLProps<HTMLElement>["className"];
}

export const CardFooter: FC<ICardFooterProps> = ({ children, className }) => {
    return <div className={twMerge("flex items-center justify-end border-t p-6 pt-4", className)}>{children}</div>;
};
