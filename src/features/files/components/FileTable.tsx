import React from 'react';
import { FileMeta } from '../types';

type Props = {
  files: FileMeta[];
};

const FileTable: React.FC<Props> = ({ files }) => {
  return (
    <div className='overflow-x-auto rounded-xl shadow-sm'>
      <table className='min-w-full bg-white text-sm text-left border border-gray-200'>
        <thead className='bg-gray-100 text-gray-600 uppercase tracking-wider'>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Size</th>
            <th className='px-4 py-2'>Uploaded At</th>
            <th className='px-4 py-2'>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className='border-t hover:bg-gray-50'>
              <td className='px-4 py-2'>{file.name}</td>
              <td className='px-4 py-2'>{Math.round(file.size / 1024)}</td>
              <td className='px-4 py-2'>
                {new Date(file.uploadedAt).toLocaleDateString()}
              </td>
              <td className='px-4 py-2'>{file.uploader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
