import Table, { ColumnsType } from 'antd/es/table';
import { MyButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/Navigation';

interface DataType {
  key: string;
  publicholiday: string;
  date: string; //type Date
  allusiveimage: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Public holiday',
    dataIndex: 'publicholiday',
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    align: 'center',
  },
  {
    title: 'Allusive image',
    dataIndex: 'allusiveimage',
    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    publicholiday: 'MEXICAN CONSTITUTION DAY',
    date: '6th February',
    allusiveimage: 'imagen',
  },
  {
    key: '2',
    publicholiday: 'BENITO JUAREZ DAY',
    date: '20th March',
    allusiveimage: 'imagen',
  },
  {
    key: '3',
    publicholiday: 'HOLI FRIDAY',
    date: '7th April',
    allusiveimage: 'imagen',
  },
  {
    key: '4',
    publicholiday: 'LABOR DAY',
    date: '1st May',
    allusiveimage: 'imagen',
  },
  {
    key: '5',
    publicholiday: 'MEXICAN REVOLUTION DAY',
    date: '20th November',
    allusiveimage: 'imagen',
  },
  {
    key: '6',
    publicholiday: 'CHRISTMAS DAY',
    date: '25th December',
    allusiveimage: 'imagen',
  },
];

export const Holidays = () => {
  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();

  return (
    <>
      <h1>Official Holidays</h1>
      <div style={{ display: 'flex', gap: 10, flexDirection: 'row-reverse' }}>
        <MyButton action="link" onClick={() => navigate('/holidays/register')}>
          Register
        </MyButton>
        <MyButton action="link" onClick={() => navigate('/holidays/catalogue')}>
          Catalogue
        </MyButton>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};
