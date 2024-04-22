import { useCallback } from "react";

interface LockScrollY {
    lock: () => void;
    unlock: () => void;
}

export const useLockScrollY = (): LockScrollY => {
    const lock = useCallback(() => {
        const documentWidth = document.documentElement.clientWidth;
        const windowWidth = window.innerWidth;
        const scrollBarWidth = windowWidth - documentWidth;

        if (document.body.ontouchstart !== null) document.body.ontouchstart = (e: TouchEvent) => e.preventDefault();

        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }, []);

    const unlock = useCallback(() => {
        if (document.body.ontouchstart !== null) document.body.ontouchstart = () => {};
        document.body.style.overflowY = "visible";
        document.body.style.paddingRight = "0";
    }, []);

    return { lock, unlock };
};
