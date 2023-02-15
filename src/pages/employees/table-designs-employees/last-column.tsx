import { ColumnsType } from 'antd/es/table';
import { UsersActiveDirectory } from '../../../api/interfaces/users/user.interface';
import { Link } from 'react-router-dom';
import { BtnTable } from '../../../components';

export const lastColumn = () => {
  const lastColumn: ColumnsType<UsersActiveDirectory> = [
    {
      title: 'Actions',
      render: (_, record) => (
        <Link to={`./${record.id}`} style={{ fontSize: '20px' }}>
          <BtnTable action="info" />
        </Link>
      ),

      align: 'center',
    },
  ];

  return lastColumn;
};
