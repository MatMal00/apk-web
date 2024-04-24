import { FC, ReactNode } from "react";

interface ICardContentProps {
    children: ReactNode | ReactNode[];
}

export const CardContent: FC<ICardContentProps> = ({ children }) => {
    return <div className="flex items-center justify-between p-6">{children}</div>;
};
