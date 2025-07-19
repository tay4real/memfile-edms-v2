// src/components/Page404.tsx

import { Link } from 'react-router-dom';
import notFoundImage from '../assets/404-illustration.jpg';

const Page404 = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4'>
      <img
        src={notFoundImage}
        alt='404 Not Found'
        className='max-w-sm w-full mb-6'
      />
      <h1 className='text-4xl font-bold text-gray-800 mb-2'>
        Oops! Page not found.
      </h1>
      <p className='text-gray-600 mb-6'>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to='/'
        className='inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300'>
        Go Back Home
      </Link>
    </div>
  );
};

export default Page404;
