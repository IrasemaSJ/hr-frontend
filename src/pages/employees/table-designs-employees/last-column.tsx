import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import { UsersActiveDirectory } from '../../../api/interfaces/users/user.interface';
import { Link } from 'react-router-dom';

export const lastColumn = () => {
  const lastColumn: ColumnsType<UsersActiveDirectory> = [
    {
      title: 'Actions',
      render: (_, record) => (
        <Link to={`./${record.id}`} style={{ fontSize: '20px' }}>
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            style={{ background: 'gray', margin: '2px' }}
          />
        </Link>
      ),

      align: 'center',
    },
  ];

  return lastColumn;
};
