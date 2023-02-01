import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
import '../../../styles/Table.css';
import * as dayjs from 'dayjs';
import { format } from '../../../helpers';

interface DataType {
  key: string;
  name_employee: string;
  folio: string;
  initial_date: string;
  days_requested: string;
}

export const columnsContigencyRequestInfo: ColumnsType<DataType> = [
  {
    title: 'Folio',
    dataIndex: 'folio',
    render: (folio) => <Link onClick={() => console.log(folio)}>{folio}</Link>,
  },
  {
    title: 'Name',
    dataIndex: 'name_employee',
    responsive: ['md'],
  },
  {
    title: 'Initial date',
    dataIndex: 'date',
    responsive: ['md'],
    render: (date) => dayjs(date).format(format.table),
  },
  {
    title: 'Days requested',
    dataIndex: 'half_date',
    responsive: ['md'],
    render: (half_date) => (half_date ? '1' : '0.5'),
  },
  {
    title: 'Information',
    align: 'center',
    className: 'table-hidden-table-column',
    render: (_, record) => (
      <>
        <div>
          <strong>Name</strong>
        </div>
        <span>{record.name_employee}</span>
        <div>
          <strong>Initial date</strong>
        </div>
        <span>{record.initial_date}</span>
        <div>
          <strong>Days requested</strong>
        </div>
        <span>{record.days_requested}</span>
      </>
    ),
  },
  {
    title: 'Actions',
    dataIndex: ['key', 'status'],
    render: () => (
      <>
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          style={{ background: 'green', margin: '2px' }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={'X'}
          style={{ background: 'red', margin: '2px' }}
        />
      </>
    ),

    align: 'center',
  },
];
