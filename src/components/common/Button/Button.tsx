import { ButtonHTMLAttributes, FC, HTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import cn from "classnames";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    icon?: ReactNode;
    className?: HTMLProps<HTMLElement>["className"];
}

export const Button: FC<IButtonProps> = ({ text, onClick, variant = "primary", icon, className, ...props }) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={cn(
                twMerge(
                    "focus-visible:ring-primary focus-visible:ring-offset-background disabled:opacity-500 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md  px-4 py-2 text-sm font-medium transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
                    className
                ),
                {
                    "bg-black text-white hover:bg-gray-900": variant === "primary",
                    "border border-gray-300 bg-white text-black hover:bg-slate-50": variant === "secondary",
                }
            )}
        >
            {icon}
            {text}
        </button>
    );
};
