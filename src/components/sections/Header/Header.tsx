import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "src/constants";
import { doSignOut } from "src/firebase";
import { useHandleDarkMode } from "src/hooks";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = () => {
    const { theme, toggletheme } = useHandleDarkMode();
    return (
        <header className="mb-6 flex h-16 items-center justify-between border-b bg-gray-900 px-4 text-white md:px-6">
            <p className="flex items-center gap-2 text-lg font-semibold">
                <span>Task Manager</span>
            </p>
            <nav className="flex items-center gap-4 md:gap-6">
                <Link className="text-sm font-medium underline-offset-4 hover:underline" to={ROUTE.HOME}>
                    Projects
                </Link>
                <Link className="text-sm font-medium underline-offset-4 hover:underline" to={""} onClick={doSignOut}>
                    Logout
                </Link>
                <button onClick={toggletheme}>
                    {theme === "dark" ? (
                        <FontAwesomeIcon icon={faSun} style={{ color: "#FFD43B" }} size="lg" />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} style={{ color: "#ffffff" }} size="lg" />
                    )}
                </button>
            </nav>
        </header>
    );
};
