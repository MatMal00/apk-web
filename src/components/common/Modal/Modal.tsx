import { FC, ReactNode } from "react";
import { useHandleClickOutside } from "src/hooks/useHandleClickOutside";

interface IModalProps {
    isOpen: boolean;
    close: () => void;
    children: ReactNode | ReactNode[];
}

export const Modal: FC<IModalProps> = ({ isOpen, close, children }) => {
    const modalRef = useHandleClickOutside<HTMLDivElement>(isOpen, close);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="w-full max-w-lg p-4">
                {children}
            </div>
        </div>
    );
};
