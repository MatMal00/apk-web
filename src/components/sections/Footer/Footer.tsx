import { FC } from "react";

interface IFooterProps {}

export const Footer: FC<IFooterProps> = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-gray-200 py-4 text-center dark:border-gray-800">
            © {currentYear} Task Manager. All rights reserved.
        </footer>
    );
};
