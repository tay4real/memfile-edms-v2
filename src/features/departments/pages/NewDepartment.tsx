import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { createDept, fetchAllDepts, clearDeptState } from '../deptSlice';
import { Department } from '../types';
import { fetchAllMDAs } from '../../mdas/mdaSlice';
import ContentHeader from '../../../components/ContentHeader';
import { Button } from '../../../components/components/ui/button';

const NewDepartment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { dept, loading, error } = useSelector(
    (state: RootState) => state.departments
  );
  const { mdas } = useSelector((state: RootState) => state.mdas);

  const [mdaID, setMdaID] = useState('');
  const [formError, setFormError] = useState('');
  const [department, setDepartment] = useState<Department>({
    deptName: '',
    deptShortName: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };

  const handleMDAChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMdaID(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!mdaID) {
      return setFormError('Please select an MDA');
    }
    if (!department.deptName || !department.deptShortName) {
      return setFormError('Department name and short name are required.');
    }

    dispatch(createDept({ mdaID, dept: department }))
      .unwrap()
      .then(() => {
        setDepartment({ deptName: '', deptShortName: '' });
        setMdaID('');
      })
      .catch(() => {});
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
    dispatch(fetchAllDepts({ mdaID }));
    return () => {
      dispatch(clearDeptState());
    };
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gray-100 py-6'>
      <ContentHeader
        title='Departments'
        subtitle='Manage all departments'
        rightElement={<Button>Add Department</Button>}
      />

      <div className='max-w-xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <h2>Add New Department</h2>

        {formError && (
          <div className='mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-2'>
            {formError}
          </div>
        )}
        {error && (
          <div className='mb-4 text-red-600 bg-red-100 border border-red-400 rounded p-2'>
            {error}
          </div>
        )}
        {dept && (
          <div className='mb-4 text-green-700 bg-green-100 border border-green-400 rounded p-2'>
            Department created successfully
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Select MDA</label>
            <select
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={mdaID}
              onChange={handleMDAChange}>
              <option value=''>Choose MDA</option>
              {mdas &&
                mdas.map((mda) => (
                  <option key={mda._id} value={mda._id}>
                    {mda.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Department Name
            </label>
            <input
              type='text'
              name='deptName'
              value={department.deptName}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter department name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>
              Department Short Name
            </label>
            <input
              type='text'
              name='deptShortName'
              value={department.deptShortName}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter short name'
            />
          </div>

          <div className='pt-2'>
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out'>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDepartment;
