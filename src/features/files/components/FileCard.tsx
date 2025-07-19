import React from 'react';
import { FileMeta } from '../types';

type FileCardProps = {
  file: FileMeta;
  onDelete?: (id: string) => void;
};

const FileCard: React.FC<FileCardProps> = ({ file, onDelete }) => {
  return (
    <div className='bg-white shadow-md rounded-xl p-4 mb-4 flex justify-between items-start'>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>{file.name}</h2>
        <p className='text-sm text-gray-500'>Uploaded by: {file.uploader}</p>
        <p>
          {Math.round(file.size / 1024)} KB ·{' '}
          {new Date(file.uploadedAt).toLocaleDateString()}{' '}
        </p>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(file.id)}
          className='text-red-500 hover:text-red-700 text-sm'>
          Delete
        </button>
      )}
    </div>
  );
};

export default FileCard;
