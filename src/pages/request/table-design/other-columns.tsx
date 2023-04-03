import { ColumnsType } from 'antd/es/table';
import { ContingencyHttp } from '../../../api/interfaces/contingencies/contingency.interfaces';
import '../../../styles/Table.css';
import { formatTableDate } from '../../../helpers';
import { Status } from '../../../components';

//design table columns to requests pendings for tm-users
export const columnsContigencyRequestInfo: ColumnsType<ContingencyHttp> = [
  {
    title: 'Name',
    dataIndex: 'name_employee',
    responsive: ['lg'],
  },
  {
    title: 'Initial date',
    responsive: ['lg'],
    dataIndex: 'date',
    render: (date) => formatTableDate(date),
  },
  {
    title: 'Days requested',
    responsive: ['lg'],
    render: () => '1',
  },
  {
    title: 'Preauthorization',
    responsive: ['lg'],
    render: (_, record) => (
      <ul>
        {record.project_responsibles.map(
          ({ id, name, project_role, preauthorize }) => (
            <li key={id}>
              {name}: | {project_role} | {<Status status={preauthorize} />}
            </li>
          ),
        )}
      </ul>
    ),
  },
  {
    title: 'Information',
    className: 'table-hidden-table-column',
    render: (_, record) => (
      <>
        <div>
          <strong>Name</strong>
        </div>
        <span> - {record.name_employee}</span>
        <div>
          <strong>Initial date</strong>
        </div>
        <span> - {formatTableDate(record.date)}</span>
        <div>
          <strong>Days requested</strong>
        </div>
        <span>1</span>
        <div>
          <strong>Preauthorization</strong>
          {record.project_responsibles.map(
            ({ id, name, project_role, preauthorize }) => (
              <div key={id}>
                {' '}
                -{name}: | {project_role} | <Status status={preauthorize} />{' '}
              </div>
            ),
          )}
        </div>
      </>
    ),
  },
];
