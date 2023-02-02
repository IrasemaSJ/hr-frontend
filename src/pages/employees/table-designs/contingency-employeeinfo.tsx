import { Button, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { formatTableDate } from '../../../helpers';
import { BtnTable, RejectActionButton } from '../../../components';
import { CheckOutlined } from '@ant-design/icons';

const { Link } = Typography;

interface DataType {
  key: string;
  folio: string;
  status: string;
  date: string;
  half_day: boolean;
}

export const columnsContigencyEmployeeInfo: ColumnsType<DataType> = [
  {
    title: 'Folio',
    dataIndex: 'folio',
    key: '1',
    render: (folio) => <Link onClick={() => console.log(folio)}>{folio}</Link>,
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
  },
  {
    title: 'Initial Date',
    dataIndex: ['date'],
    key: '3',
    render: (date) => {
      return <>{`${formatTableDate(date)}`}</>;
    },
  },
  {
    title: 'Number of days',
    dataIndex: 'half_date',
    key: '4',
    render: (half_date) => (half_date ? '1' : '0.5'),
  },
  {
    title: 'Actions',
    dataIndex: ['key', 'status'],
    render: (_, record) =>
      record.status === 'pending' ? (
        <>
          <BtnTable action="accept" />
          <RejectActionButton />
        </>
      ) : record.status === 'approved' ? (
        <BtnTable action='edit' />
      ) : (
        <></>
      ),
  },
];
