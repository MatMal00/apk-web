import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "src/constants";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-gray-900 px-4 text-white md:px-6">
            <p className="flex items-center gap-2 text-lg font-semibold">
                <span>Task Manager</span>
            </p>
            <nav className="flex items-center gap-4 md:gap-6">
                <Link className="text-sm font-medium underline-offset-4 hover:underline" to={ROUTE.HOME}>
                    Projects
                </Link>
                <Link className="text-sm font-medium underline-offset-4 hover:underline" to={""}>
                    Logout
                </Link>
            </nav>
        </header>
    );
};
