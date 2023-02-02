import { ColumnsType } from 'antd/es/table';
import '../../../styles/Table.css';
import * as dayjs from 'dayjs';
import { format } from '../../../helpers';
import { ContingencyHttp } from '../../../api/interfaces';
import { RejectActionButton } from '../../../components';

//design table columns to requests pendings for tm-users
export const columnsContigencyRequestInfo: ColumnsType<ContingencyHttp> = [
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
    render: (_, record) => (record.half_day ? '0.5' : '1'),
  },
  {
    title: 'Information',
    className: 'table-hidden-table-column',
    render: (_, record) => (
      <>
        <div>
          <strong>Name</strong>
        </div>
        <span>- {record.name_employee}</span>
        <div>
          <strong>Initial date</strong>
        </div>
        <span> - {dayjs(record.date).format(format.table)}</span>
        <div>
          <strong>Days requested</strong>
        </div>
        <span>{record.half_day ? '- 0.5' : '- 1'}</span>
      </>
    ),
  },
];
