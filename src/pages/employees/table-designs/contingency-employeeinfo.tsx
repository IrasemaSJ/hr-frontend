import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { formatTableDate } from '../../../helpers';
import { ContingencyHttp } from '../../../api/interfaces/contingency.interfaces';
import '../../../styles/Table.css';

export const columnsContigencyEmployeeInfo: ColumnsType<ContingencyHttp> = [
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
    responsive: ['lg'],
  },
  {
    title: 'Initial Date',
    dataIndex: ['date'],
    key: '3',
    render: (date) => {
      return <>{`${formatTableDate(date)}`}</>;
    },
    responsive: ['lg'],
  },
  {
    title: 'Number of days',
    dataIndex: 'half_day',
    render: (half_day) => {
      return half_day ? '0.5' : '1';
    },
    responsive: ['lg'],
  },
  {
    title: 'Information',
    className: 'table-hidden-table-column',
    render: (_, record) => (
      <>
        <div>
          <strong>Status</strong>
          <div>
            -&nbsp;
            {record.status === 'approved' ? (
              <Tag color="green"> {record.status} </Tag>
            ) : record.status === 'rejected' ? (
              <Tag color="red"> {record.status} </Tag>
            ) : record.status === 'pending' ? (
              <Tag color="yellow"> {record.status} </Tag>
            ) : (
              <Tag color="black"> {record.status} </Tag>
            )}
          </div>
        </div>
        <span> - {formatTableDate(record.date)}</span>
        <div>
          <strong>Initial date</strong>
        </div>
        <span> - {formatTableDate(record.date)}</span>
        <div>
          <strong>Days requested</strong>
        </div>
        <span>{record.half_day ? '- 0.5' : '- 1'}</span>
      </>
    ),
  },
];
