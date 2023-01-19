import Table, { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  seniorityyears: string;
  daysbylaw: number;
  daysbyimproving: number;
  total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Seniority (years)',
    dataIndex: 'seniorityyears',
    align: 'center',
  },
  {
    title: 'Days by law',
    dataIndex: 'daysbylaw',
    align: 'center',
  },
  {
    title: 'Days by Improving',
    dataIndex: 'daysbyimproving',
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    seniorityyears: '1',
    daysbylaw: 12,
    daysbyimproving: 4,
    total: 16,
  },
  {
    key: '2',
    seniorityyears: '2',
    daysbylaw: 14,
    daysbyimproving: 2,
    total: 16,
  },
  {
    key: '3',
    seniorityyears: '3',
    daysbylaw: 16,
    daysbyimproving: 0,
    total: 16,
  },
  {
    key: '4',
    seniorityyears: '4',
    daysbylaw: 18,
    daysbyimproving: 0,
    total: 18,
  },
  {
    key: '5',
    seniorityyears: '5',
    daysbylaw: 20,
    daysbyimproving: 0,
    total: 20,
  },
  {
    key: '6',
    seniorityyears: '6 to 10',
    daysbylaw: 22,
    daysbyimproving: 0,
    total: 22,
  },
  {
    key: '7',
    seniorityyears: '11 to 12',
    daysbylaw: 24,
    daysbyimproving: 0,
    total: 24,
  },
  {
    key: '8',
    seniorityyears: '13',
    daysbylaw: 24,
    daysbyimproving: 1,
    total: 25,
  },
  {
    key: '9',
    seniorityyears: '14 to 15',
    daysbylaw: 24,
    daysbyimproving: 2,
    total: 26,
  },
  {
    key: '10',
    seniorityyears: '16 to 20',
    daysbylaw: 26,
    daysbyimproving: 1,
    total: 27,
  },
];

export const VacationSeniority = () => {
  return (
    <>
      <h1>Vacation Seniority</h1>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: '20px' }}
      />
    </>
  );
};
