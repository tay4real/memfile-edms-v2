import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchMDAByIdAPI, updateMDAAPI } from '@/services/mdaAPI';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';

type EditFormData = {
  name: string;
  shortName: string;
};

const EditMDA: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<EditFormData>({
    name: '',
    shortName: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'MDAs', path: '/mdas' },
    { label: 'Edit MDA' }, // last item has no path
  ];

  // Fetch MDA by ID
  useEffect(() => {
    const loadMDA = async () => {
      try {
        setLoading(true);
        const res = await fetchMDAByIdAPI(id!);
        setFormData({
          name: res.data.name,
          shortName: res.data.shortName,
        });
      } catch (err: any) {
        setError('Failed to load MDA');
      } finally {
        setLoading(false);
      }
    };
    loadMDA();
  }, [id]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateMDAAPI(id!, formData);
      setSuccessMessage('MDA updated successfully');
    } catch (err: any) {
      setError(err?.response?.data || 'Failed to update MDA');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage || error) {
      const timeout = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, error]);

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <Breadcrumb items={breadcrumbItems} />
      <Card>
        <CardHeader>
          <CardTitle>Edit MDA</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert
              variant='destructive'
              className='mb-4 border-red-400 bg-red-100 text-red-800'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert
              variant='default'
              className='b-4 border-green-400 bg-green-100 text-green-800'>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter MDA name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='shortName'>Short Name</Label>
              <Input
                id='shortName'
                value={formData.shortName}
                onChange={handleChange}
                placeholder='Enter MDA short name'
              />
            </div>

            <Button type='submit' className='w-full mt-4' disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMDA;
