import { ColumnsType } from 'antd/es/table';
import { UsersActiveDirectory } from '../../../api/interfaces/users/user.interface';

//design for colums employees
export const columnsUsersAC: ColumnsType<UsersActiveDirectory> = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Admission date',
    dataIndex: 'date_admission',
  },
  {
    title: 'Seniority (years)',
    dataIndex: 'date_admission',
    render: (date_admission) => {
      //calculate the years base on admission date
      const DA = new Date(date_admission).getTime();
      const today = new Date().getTime();
      const seniority = (today - DA) / (1000 * 60 * 60 * 24 * 365.25);

      return Math.floor(seniority);
    },
  },
];
