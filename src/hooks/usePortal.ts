import { useEffect, useRef } from "react";

const createRootElement = (id: string) => {
    const root = document.createElement("div");
    root.setAttribute("id", id);
    return root;
};

const addRootElement = (rootElement: Element) => {
    if (document.body.lastElementChild)
        document.body.insertBefore(rootElement, document.body.lastElementChild.nextElementSibling);
};

export const usePortal = (id = "portal-root") => {
    const rootElementRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const existingParent = document.querySelector(`#${id}`);
        const parentElement = existingParent || createRootElement(id);

        if (!existingParent) addRootElement(parentElement);
        rootElementRef.current && parentElement.appendChild(rootElementRef.current);

        return () => {
            if (rootElementRef.current) rootElementRef.current.remove();
            if (!parentElement.childElementCount) parentElement.remove();
        };
    }, [id]);

    const getRootElement = () => {
        if (!rootElementRef.current) rootElementRef.current = document.createElement("div");

        return rootElementRef.current;
    };

    return getRootElement();
};
