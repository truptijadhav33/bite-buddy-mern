import { useState, useCallback } from "react";

/**
 * Standard hook for managing "open/close" state (Modals, Drawers, etc.)
 */
export default function useDisclosure(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

    return { isOpen, onOpen, onClose, onToggle };
}
