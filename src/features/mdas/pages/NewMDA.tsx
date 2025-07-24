import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { createMDA } from '@/features/mdas/mdaSlice';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortName: z.string().min(1, 'Short name is required'),
});

type FormData = z.infer<typeof schema>;

const NewMDA: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { successMessage, error } = useSelector(
    (state: RootState) => state.mdas
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(createMDA(data));
    reset();
  };

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Add New MDA</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.name && (
            <Alert variant='destructive' className='mb-4'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.name.message}</AlertDescription>
            </Alert>
          )}
          {errors.shortName && (
            <Alert variant='destructive' className='mb-4'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errors.shortName.message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant='destructive' className='mb-4'>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert variant='default' className='mb-4'>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                {...register('name')}
                placeholder='Enter MDA name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='shortName'>Short Name</Label>
              <Input
                id='shortName'
                {...register('shortName')}
                placeholder='Enter MDA short name'
              />
            </div>

            <Button type='submit' className='w-full mt-4'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewMDA;
