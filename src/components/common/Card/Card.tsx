import { FC, ReactNode } from "react";
import { CardContent, CardHeader } from "./components";

interface ICardProps {
    children: ReactNode | ReactNode[];
}

interface ICardElement extends FC<ICardProps> {
    Header: typeof CardHeader;
    Content: typeof CardContent;
}

export const Card: ICardElement = ({ children }) => {
    return <div className="cursor-pointer rounded-lg border bg-white shadow-sm">{children}</div>;
};

Card.Header = CardHeader;
Card.Content = CardContent;
