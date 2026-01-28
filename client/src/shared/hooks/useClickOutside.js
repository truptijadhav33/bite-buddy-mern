import { useEffect, useRef } from "react";

/**
 * Detects clicks outside of a specific element.
 * Useful for closing dropdowns or modals.
 */
export default function useClickOutside(handler) {
    const domNode = useRef();

    useEffect(() => {
        const listener = (event) => {
            if (!domNode.current || domNode.current.contains(event.target)) {
                return;
            }
            handler();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [handler]);

    return domNode;
}
