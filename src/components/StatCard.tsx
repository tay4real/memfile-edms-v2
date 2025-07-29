import React from 'react';
import { Link } from 'react-router-dom';

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
  bgColor?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  link,
  bgColor = 'bg-blue-600',
}) => {
  return (
    <div className={`rounded shadow-md p-6 text-white ${bgColor}`}>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-2xl font-bold'>{value}</h3>
          <p className='text-sm'>{title}</p>
        </div>
        <div>{icon}</div>
      </div>
      <Link to={link} className='text-sm underline mt-2 block text-white/90'>
        More info
      </Link>
    </div>
  );
};

export default StatCard;
