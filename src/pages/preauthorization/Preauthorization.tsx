import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { PreauthorizationForm } from './PreauthorizationForm';
import { project_role, ProjectRole } from './interfaces/preauthorization';
import { BtnTable } from '../../components';

interface PreauthorizationRow {
  id: number;
  email: string;
  position: string;
  name: string;
}

const preauthorizationRows: PreauthorizationRow[] = [
  {
    id: 1,
    email: 'irasea.serrano@improving.com',
    position: 'DO',
    name: 'Irasema Serrano',
  },
  {
    id: 2,
    email: 'arturo.mosqueda@improving.com',
    position: 'TL',
    name: 'Arturo Mozqueda',
  },
];

const columns: ColumnsType<PreauthorizationRow> = [
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
      <Tooltip title={project_role[position as keyof typeof project_role]}>{position}</Tooltip>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'id',
    align: 'center',
    render: (id) => <BtnTable action="delete" onClick={() => alert(id)} />,
  },
];

export const Preauthorization = () => {
  return (
    <div>
      <h1>Preauthorization</h1>
      <PreauthorizationForm
        handleSubmit={(text) => alert(JSON.stringify(text))}
      />
      <Table
        // loading={isLoadingTable}
        columns={columns}
        dataSource={preauthorizationRows}
        rowKey="_id"
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};
