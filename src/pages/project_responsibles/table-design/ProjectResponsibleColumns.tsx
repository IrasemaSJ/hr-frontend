import { ColumnsType } from 'antd/es/table';
import { ProjectResponsiblesHttp } from '../../../api/interfaces';
import { role_project } from '../interfaces/preauthorization';
import { Tooltip } from 'antd';
import { BtnTable } from '../../../components';

interface Params {
  setParams: (record: ProjectResponsiblesHttp) => void;
}

export const ProjectResponsibleColums = ({ setParams }: Params) => {
  const projectResponsibleColumns: ColumnsType<ProjectResponsiblesHttp> = [
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

  return projectResponsibleColumns;
};
