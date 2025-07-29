import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchIncomingMailStats,
  fetchIncomingMailCounts,
} from '@/features/incomingMails/incomingMailsSlice';
import {
  fetchOutgoingMailStats,
  fetchOutgoingMailCounts,
} from '@/features/outgoingMails/outgoingMailsSlice';
import { fetchGeneralFilesCounts } from '@/features/generalFiles/generalFilesSlice';

import { Mail, MailOpen, FolderClosed } from 'lucide-react';
import Chart from '@/components/Chart';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import StatCard from '@/components/StatCard';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  const { stats: incomingMailStats, counts: incomingMailCounts } =
    useAppSelector((state) => state.incomingMails);

  const { stats: outgoingMailStats, counts: outgoingMailCounts } =
    useAppSelector((state) => state.outgoingMails);

  const { counts: generalFileCounts } = useAppSelector(
    (state) => state.generalFiles
  );

  useEffect(() => {
    dispatch(fetchIncomingMailStats());
    dispatch(fetchIncomingMailCounts());
    dispatch(fetchOutgoingMailStats());
    dispatch(fetchOutgoingMailCounts());
    dispatch(fetchGeneralFilesCounts());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/' }]} />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <StatCard
          title='Incoming Mails'
          value={incomingMailCounts?.total ?? 0}
          icon={<Mail className='w-8 h-8 text-white' />}
          link='/incoming-mails'
          bgColor='bg-blue-600'
        />
        <StatCard
          title='Outgoing Mails'
          value={outgoingMailCounts?.total ?? 0}
          icon={<MailOpen className='w-8 h-8 text-white' />}
          link='/outgoing-mails'
          bgColor='bg-green-600'
        />
        <StatCard
          title='General Files'
          value={generalFileCounts?.total ?? 0}
          icon={<FolderClosed className='w-8 h-8 text-white' />}
          link='/general-files'
          bgColor='bg-yellow-500'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Chart
          title='Incoming Mail Analytics'
          data={incomingMailStats.map((item) => ({
            name: MONTHS[item._id - 1],
            'New Incoming Mail': item.total,
          }))}
          dataKey='New Incoming Mail'
        />
        <Chart
          title='Outgoing Mail Analytics'
          data={outgoingMailStats.map((item) => ({
            name: MONTHS[item._id - 1],
            'New Outgoing Mail': item.total,
          }))}
          dataKey='New Outgoing Mail'
        />
      </div>
    </div>
  );
};

export default Dashboard;
