import { ColumnsType } from 'antd/es/table';
import { PreauthorizationHttp } from '../../../api/interfaces/preauthorizations/preauthorization.interface';
import { role_project } from '../interfaces/preauthorization';
import { Tooltip } from 'antd';
import { BtnTable } from '../../../components';

interface Params {
  setParams: (record: PreauthorizationHttp) => void;
}

export const PreauthorizationColums = ({ setParams }: Params) => {
  const preauthorizationColumns: ColumnsType<PreauthorizationHttp> = [
    {
      title: 'Name',
      dataIndex: 'name_responsible',
    },
    {
      title: 'Email',
      dataIndex: 'email_responsible',
    },
    {
      title: 'Position',
      dataIndex: 'project_role',
      render: (project_role) => (
        <Tooltip
          title={role_project[project_role as keyof typeof role_project]}
        >
          {project_role}
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      align: 'center',
      render: (_, record) => (
        <BtnTable action="delete" onClick={() => setParams(record)} />
      ),
    },
  ];

  return preauthorizationColumns;
};
