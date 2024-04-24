import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IKebabMenuProps {}

export const KebabMenu: FC<IKebabMenuProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleToggleKebabMenu = () => setIsOpen((prev) => !prev);

    const handleDeleteProject = () => {
        handleToggleKebabMenu();
        console.log("DELETE");
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event?.target as Node)) setIsOpen(false);
    }, []);

    useEffect(() => {
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    return (
        <div className="relative">
            <button
                className="rounded-lg px-3.5 py-1 transition-colors hover:bg-gray-100"
                onClick={handleToggleKebabMenu}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {isOpen && (
                <div
                    ref={modalRef}
                    className="absolute right-0  w-40 origin-top-right overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <button
                        onClick={handleDeleteProject}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-red-900 hover:text-gray-900"
                        role="menuitem"
                    >
                        Delete
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
        </div>
    );
};
