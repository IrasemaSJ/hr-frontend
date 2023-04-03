import { ColumnsType } from 'antd/es/table';
import { BtnTable } from '../../../components';
import { Dispatch, SetStateAction } from 'react';
import { SetParamsContingnecy } from '../../../hooks/useRequestPage';
import { ContingencyHttp } from '../../../api/interfaces';

interface Params {
  setParams: ({ record, openModal }: SetParamsContingnecy) => Promise<void>;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
  employee_id: string;
  setAction: Dispatch<SetStateAction<'Cancel' | 'Delete'>>;
}

export const lastColumn = ({
  setParams,
  setModalEdit,
  setModalDelete,
  employee_id,
  setAction,
}: Params) => {
  const lastColumn: ColumnsType<ContingencyHttp> = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) =>
        record.status === 'pending' || record.status === 'rejected' ? (
          <>
            <BtnTable
              action="edit"
              onClick={() =>
                setParams({
                  record,
                  openModal: setModalEdit,
                })
              }
            />
            <BtnTable
              action="delete"
              onClick={() => {
                setParams({
                  record,
                  openModal: setModalDelete,
                });
                setAction('Delete');
              }}
            />
          </>
        ) : employee_id !== '' && record.status === 'approved' ? (
          <BtnTable
            action="cancel"
            onClick={() => {
              setParams({
                record,
                openModal: setModalDelete,
              });
              setAction('Cancel');
            }}
          />
        ) : (
          <></>
        ),
      align: 'center',
    },
  ];

  return lastColumn;
};
