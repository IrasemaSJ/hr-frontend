import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Tooltip } from 'antd';
import { PreauthorizationRow, project_role } from '../interfaces/preauthorization';
import { BtnTable } from '../../../components/buttons/Buttons';

exportconst columns: ColumnsType<PreauthorizationRow> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    render: (position: string) => (
      // <Tooltip title={project_role[position as keyof typeof project_role]}>
      //   {position}
      // </Tooltip>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    align: 'center',
    // render: (id) => <BtnTable action="delete" onClick={() => alert(id)} />,
  },
];
