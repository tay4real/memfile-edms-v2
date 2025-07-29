import React from 'react';
import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  path?: string; // path is optional for the last item
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className='text-sm text-gray-500 mb-4' aria-label='Breadcrumb'>
      <ol className='list-none p-0 inline-flex flex-wrap space-x-2'>
        {items.map((item, index) => (
          <li key={index} className='inline-flex items-center'>
            {item.path ? (
              <Link to={item.path} className='text-blue-600 hover:underline'>
                {item.label}
              </Link>
            ) : (
              <span className='text-gray-800 font-medium'>{item.label}</span>
            )}
            {index < items.length - 1 && <span className='mx-2'>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
