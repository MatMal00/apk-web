import { FC, ReactElement } from "react";
import { createPortal } from "react-dom";
import { usePortal } from "src/hooks";

interface IPortalProps {
    children: ReactElement;
    id?: string;
}

export const Portal: FC<IPortalProps> = ({ children, id }) => {
    const target = usePortal(id);
    return createPortal(children, target);
};
