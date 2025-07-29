import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchAllMDAs, deleteMDA } from '@/features/mdas/mdaSlice';
import { Link } from 'react-router-dom';
import DeleteModal from '@/components/DeleteModal';
import Spinner from '@/components/Spinner';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';

const MDAsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mdas, loading } = useSelector((state: RootState) => state.mdas);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMDA, setSelectedMDA] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'MDAs' }, // No path since this is the current page
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mdas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mdas.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchAllMDAs());
  }, [dispatch]);

  const handleShowDeleteModal = (id: string, name: string) => {
    setShowDeleteModal(true);
    setSelectedMDA({ id, name });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMDA({ id: '', name: '' });
  };

  const handleDelete = async () => {
    await dispatch(deleteMDA(selectedMDA.id));
    setShowDeleteModal(false);
  };

  if (loading) return <Spinner />;

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <Breadcrumb items={breadcrumbItems} />
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-gray-800'>All MDAs</h2>
        <Link
          to='/mdas/create'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add MDA
        </Link>
      </div>

      <table className='w-full table-auto border'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='text-left p-2 border'>MDA Name</th>
            <th className='text-left p-2 border'>Short Name</th>
            <th className='text-left p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((mda) => (
            <tr key={mda._id} className='border-t'>
              <td className='p-2 border'>{mda.name}</td>
              <td className='p-2 border'>{mda.shortName}</td>
              <td className='p-2 border flex gap-2'>
                <Link
                  to={`/mdas/edit/${mda._id}`}
                  className='text-blue-600 hover:underline'>
                  Edit
                </Link>
                <button
                  onClick={() => handleShowDeleteModal(mda._id!, mda.name)}
                  className='text-red-600 hover:underline'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4 flex justify-center items-center gap-2'>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50'>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}>
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50'>
          Next
        </button>
      </div>

      <DeleteModal
        show={showDeleteModal}
        body={`Are you sure you want to delete "${selectedMDA.name}"?`}
        delete={handleDelete}
        handleClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default MDAsList;
