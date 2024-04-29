import { FC, ReactNode } from "react";

interface IColumnProps {
    title: string;
    children: ReactNode;
}

export const Column: FC<IColumnProps> = ({ title, children }) => {
    return (
        <ul className="flex flex-col gap-6 rounded-lg bg-gray-200 p-4 shadow-md">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </ul>
    );
};
