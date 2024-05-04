import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export const useHandleDarkMode = () => {
    const [theme, setTheme] = useLocalStorage("theme", localStorage.getItem("theme") ?? "light");

    const handleToggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return { toggletheme: handleToggleTheme, theme };
};
