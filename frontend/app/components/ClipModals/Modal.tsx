"use client";

import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'

interface ModalProps {
    content: React.ReactNode;
    // onClose: () => void;
}

const Modal = ({ content }: ModalProps) => {
    const { closeModal } = useGlobalState();

    return (
        <div className="modal-container fixed top-0 left-0 w-full h-screen z-20">
            <div className="modal-overlay bg-[#00000099] w-full h-full" onClick={closeModal}>
                <div className="modal-content p-10 z-50">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Modal