import { ColumnsType } from 'antd/es/table';
import { formatTableDate } from '../../../helpers';
import { ContingencyHttp } from '../../../api/interfaces/contingency.interfaces';
import '../../../styles/Table.css';
import { Status } from '../../../components';

export const columnsContigencyEmployeeInfo: ColumnsType<ContingencyHttp> = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: '2',
    render: (status) => <Status status={status} />,
    responsive: ['lg'],
  },
  {
    title: 'Initial Date',
    dataIndex: ['date'],
    key: '3',
    render: (date) => <>{`${formatTableDate(date)}`}</>,
    responsive: ['lg'],
  },
  {
    title: 'Number of days',
    dataIndex: 'half_day',
    render: (half_day) => <>{half_day ? '0.5' : '1'}</>,
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
            <Status status={record.status} />
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
