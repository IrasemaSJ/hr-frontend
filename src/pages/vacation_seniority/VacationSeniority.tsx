import Table, { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  seniorityyears: number;
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
    seniorityyears: 1,
    daysbylaw: 12,
    daysbyimproving: 4,
    total: 16,
  },
  {
    key: '2',
    seniorityyears: 2,
    daysbylaw: 14,
    daysbyimproving: 2,
    total: 16,
  },
  {
    key: '3',
    seniorityyears: 3,
    daysbylaw: 14,
    daysbyimproving: 2,
    total: 16,
  },
  {
    key: '4',
    seniorityyears: 4,
    daysbylaw: 16,
    daysbyimproving: 2,
    total: 18,
  },
  {
    key: '5',
    seniorityyears: 5,
    daysbylaw: 19,
    daysbyimproving: 1,
    total: 20,
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
