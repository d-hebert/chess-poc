import React, { useEffect, useRef } from 'react';
import './modules.css';

export const Drawer = ({ children, open, onClose }) => {
    const handleClose = () => onClose();
    const drawerRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                handleClose()
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [drawerRef]);

    if (!open) return null;

    return (
        <div>
            <div className="drawer" ref={drawerRef}>
                {children}
            </div>
            <div className="modal-screen" />
        </div>
    )
};
