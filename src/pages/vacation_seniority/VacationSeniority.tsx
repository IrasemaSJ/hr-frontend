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
    daysbyimproving: 12,
    total: 24,
  },
  {
    key: '2',
    seniorityyears: 2,
    daysbylaw: 13,
    daysbyimproving: 3,
    total: 16,
  },
  {
    key: '3',
    seniorityyears: 3,
    daysbylaw: 14,
    daysbyimproving: 1,
    total: 15,
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
