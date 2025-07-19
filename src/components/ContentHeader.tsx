// src/components/ContentHeader.tsx

import React from 'react';

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  subtitle,
  rightElement,
}) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>
        {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default ContentHeader;
