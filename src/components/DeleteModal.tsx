import React from 'react';

interface DeleteModalProps {
  show: boolean;
  body: string;
  delete: () => void;
  handleClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  body,
  delete: handleDelete,
  handleClose,
}) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black/30 z-40 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 shadow-lg w-full max-w-md z-50'>
        <h2 className='text-lg font-semibold mb-4'>Confirm Deletion</h2>
        <p className='mb-4'>{body}</p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={handleClose}
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800'>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
