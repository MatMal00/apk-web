import { FC, ReactNode } from "react";

interface ICardHeaderProps {
    children: ReactNode | ReactNode[];
}

export const CardHeader: FC<ICardHeaderProps> = ({ children }) => {
    return <div className="flex flex-row items-center gap-4 space-y-1.5 p-6">{children}</div>;
};
