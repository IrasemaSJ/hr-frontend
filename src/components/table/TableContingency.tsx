import { Table, Typography, Tag, Button, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import ApiHR from '../../api/ApiHR';
import { RejectActionButton } from '../../components';
import { ColumnsType } from 'antd/es/table';
import * as dayjs from 'dayjs';

const { Link } = Typography;
interface DataType {
  key: string;
  folio: string;
  status: string;
  date: string;
  days_requested: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Folio',
    dataIndex: 'folio',
    key: '1',
    render: (folio) => <Link onClick={() => console.log(folio)}>{folio}</Link>,
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: '2',
    render: (status) =>
      status === 'approved' ? (
        <Tag color="green"> {status} </Tag>
      ) : status === 'rejected' ? (
        <Tag color="red"> {status} </Tag>
      ) : status === 'pending' ? (
        <Tag color="yellow"> {status} </Tag>
      ) : (
        <Tag color="black"> {status} </Tag>
      ),
    align: 'center',
  },
  {
    title: 'Date',
    dataIndex: ['date', 'half_day'],
    key: '3',
    align: 'center',
    render: (date, half_day) => (
      <>{`${dayjs(date).format('DD MM YYYY')}${
        half_day ? ' (Half Day)' : ''
      }`}</>
    ),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: '4',
    render: (updatedAt) => <>{`${dayjs(updatedAt).format('DD MM YYYY')}`}</>,
    align: 'center',
  },
  {
    title: 'Actions',
    dataIndex: ['key', 'status'],
    render: (_, record) =>
      record.status === 'pending' ? (
        <>
          <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            style={{ background: 'green', margin: '2px' }}
          />
          <RejectActionButton />
        </>
      ) : record.status === 'approved' ? (
        <Button
          type="primary"
          shape="circle"
          icon="🗑"
          style={{ background: 'orange', margin: '2px' }}
        />
      ) : (
        <></>
      ),
    align: 'center',
  },
];

export const TableContingency = () => {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  

  const getRegistersByPage = async (page?: number) => {
    setIsLoading(true);
    const { data } = await ApiHR(`/contingencies?page=${page || 1}`);
    setRows(data.docs);
    setTotal(data.totalDocs);
    setIsLoading(false);
  };

  useEffect(() => {
    getRegistersByPage();
  }, []);

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={'_id'}
        dataSource={rows}
        pagination={{
          pageSize: 5,
          total,
          onChange(page) {
            getRegistersByPage(page);
          },
        }}
      />
    </div>
  );
};
