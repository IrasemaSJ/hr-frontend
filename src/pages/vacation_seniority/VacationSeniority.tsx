import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import ApiHR from '../../api/ApiHR';

interface DataType {
  key: string;
  seniority: string;
  days_by_law: number;
  days_by_improving: number;
  total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Seniority (years)',
    dataIndex: 'seniority',
    align: 'center',
  },
  {
    title: 'Days by law',
    dataIndex: 'days_by_law',
    align: 'center',
  },
  {
    title: 'Days by Improving',
    dataIndex: 'days_by_improving',
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    render: (_, record) => <>{record.days_by_improving + record.days_by_law}</>,
    align: 'center',
  },
];

export const VacationSeniority = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getVacationRegisters = async () => {
    setIsLoading(true);
    const { data } = await ApiHR(`/seniorities`);
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getVacationRegisters();
  }, []);

  return (
    <>
      <h1>Vacation Seniority</h1>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={'_id'}
        dataSource={data}
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true, pageSize: 20 }}
        size="small"
      />
    </>
  );
};
