import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  title: string;
  data: { name: string; [key: string]: number | string }[];
  dataKey: string;
  grid?: boolean;
}

const Chart: React.FC<ChartProps> = ({ title, data, dataKey, grid }) => {
  return (
    <div className='bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 w-full'>
      <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4'>
        {title}
      </h2>
      <div className='w-full h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <XAxis dataKey='name' stroke='#8884d8' />
            <Line type='monotone' dataKey={dataKey} stroke='#8884d8' />
            <Tooltip />
            {grid && <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
