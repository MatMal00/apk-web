import { useCallback, useEffect, useRef } from "react";

export const useHandleClickOutside = <T extends HTMLElement>(isOpen: boolean, close: () => void) => {
    const modalRef = useRef<T | null>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event?.target as Node)) close();
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    return modalRef;
};
