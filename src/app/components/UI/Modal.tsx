// components/Modal.tsx
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
			onClick={onClose}
		>
			<div
				onClick={(e) => e.stopPropagation()} // Stops click from closing the modal
				// Add more styling as needed
			>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
