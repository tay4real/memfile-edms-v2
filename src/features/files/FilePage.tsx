import React from 'react';
import { FileMeta } from './types';
import FileTable from './components/FileTable';

const files: FileMeta[] = [
  {
    id: '1',
    name: 'invoice.pdf',
    size: 50960,
    uploadedAt: '2025-07-17T12:00:00Z',
    uploader: 'Admin',
  },
  {
    id: '2',
    name: 'resume.docx',
    size: 102400,
    uploadedAt: '2025-07-16T09:30:00Z',
    uploader: 'Bob',
  },
];

const FilePage: React.FC = () => {
  const handleDelete = (id: string) => {
    console.log(`Delete file with ID: ${id}`);
  };

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Uploaded Files</h1>
      <FileTable files={files} />
    </div>
  );
};

export default FilePage;
