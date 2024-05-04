import { FC, ReactNode } from "react";
import { useHandleClickOutside } from "src/hooks/useHandleClickOutside";
import { Portal } from "../Portal";
import cn from "classnames";

interface IModalProps {
    isOpen: boolean;
    close: () => void;
    children: ReactNode | ReactNode[];
    large?: boolean;
}

export const Modal: FC<IModalProps> = ({ isOpen, close, large, children }) => {
    const modalRef = useHandleClickOutside<HTMLDivElement>(isOpen, close);

    if (!isOpen) return null;
    return (
        <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div
                    ref={modalRef}
                    className={cn("w-full p-4", {
                        "max-w-lg": !large,
                        "max-w-screen-xl": large,
                    })}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
