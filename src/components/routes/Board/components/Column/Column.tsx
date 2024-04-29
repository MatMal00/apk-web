import { FC, ReactNode } from "react";
import { ColumnItem } from "./ColumnItem";

interface IColumnProps {
    children: ReactNode;
    title: string;
}

interface IColumnElement extends FC<IColumnProps> {
    Item: typeof ColumnItem;
}

export const Column: IColumnElement = ({ title, children }) => {
    return (
        <ul className="flex flex-col gap-6 rounded-lg bg-gray-200 p-4 shadow-md">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </ul>
    );
};

Column.Item = ColumnItem;
