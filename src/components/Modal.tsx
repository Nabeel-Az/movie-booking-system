import React from 'react';
import { ModalProps } from '../models/form-model';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isUpdate, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{isUpdate ? 'Update Booking' : 'Book Movie'}</h3>
          <button onClick={onClose} className="text-gray-600">X</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
