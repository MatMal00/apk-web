import { FC, HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICardContentProps {
    children: ReactNode | ReactNode[];
    className?: HTMLProps<HTMLElement>["className"];
}

export const CardContent: FC<ICardContentProps> = ({ children, className }) => {
    return <div className={twMerge("flex items-center justify-between p-6", className)}>{children}</div>;
};
