import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchAllMDAs } from '@/features/mdas/mdaSlice';
import { createDept, clearDeptState } from '@/features/departments/deptSlice';
import Breadcrumb from '@/components/Breadcrumb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NewDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mdas } = useAppSelector((state) => state.mdas);
  const { successMessage, error: globalError } = useAppSelector(
    (state) => state.departments
  );

  const [localError, setLocalError] = useState<string | null>(null);
  const [mdaID, setMdaID] = useState('');
  const [department, setDepartment] = useState({
    deptName: '',
    deptShortName: '',
  });

  const [showAlert, setShowAlert] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDepartment((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMdaID(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mdaID) return setLocalError('Please select an MDA.');
    if (!department.deptName || !department.deptShortName) {
      return setLocalError('Department name and short name are required.');
    }

    dispatch(createDept({ mdaID: mdaID, dept: department }));
    setDepartment({ deptName: '', deptShortName: '' });
    setMdaID('');
    setLocalError(null);
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);

  // Automatically clear messages after 3 seconds
  useEffect(() => {
    if (successMessage || globalError) {
      const timer = setTimeout(() => {
        dispatch(clearDeptState());
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage, globalError, dispatch]);

  return (
    <div className='space-y-6'>
      <Breadcrumb
        items={[
          { label: 'Departments', path: '/departments' },
          { label: 'New Department' },
        ]}
      />

      <div className='max-w-xl mx-auto bg-white p-6 rounded-md shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Add New Department</h2>

        {localError && (
          <Alert
            variant='destructive'
            className='mb-4 border-red-400 bg-red-100 text-red-800'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{localError}</AlertDescription>
          </Alert>
        )}
        {globalError && (
          <Alert
            variant='destructive'
            className='mb-4 border-red-400 bg-red-100 text-red-800'>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert
            variant='default'
            className='mb-4 border-green-400 bg-green-100 text-green-800'>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              MDA
            </label>
            <select
              value={mdaID}
              onChange={handleSelectChange}
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'>
              <option value=''>Select an MDA</option>
              {mdas.map((mda) => (
                <option key={mda._id} value={mda._id}>
                  {mda.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor='deptName'
              className='block mb-1 text-sm font-medium text-gray-700'>
              Department Name
            </label>
            <input
              type='text'
              id='deptName'
              value={department.deptName}
              onChange={handleInputChange}
              placeholder='Enter Department name'
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div>
            <label
              htmlFor='deptShortName'
              className='block mb-1 text-sm font-medium text-gray-700'>
              Department Short Name
            </label>
            <input
              type='text'
              id='deptShortName'
              value={department.deptShortName}
              onChange={handleInputChange}
              placeholder='Enter Department short name'
              className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDepartment;
