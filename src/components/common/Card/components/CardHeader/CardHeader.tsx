import { FC, HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICardHeaderProps {
    children: ReactNode | ReactNode[];
    className?: HTMLProps<HTMLElement>["className"];
}

export const CardHeader: FC<ICardHeaderProps> = ({ children, className }) => {
    return <div className={twMerge("flex flex-row items-center gap-4 space-y-1.5 p-6", className)}>{children}</div>;
};
