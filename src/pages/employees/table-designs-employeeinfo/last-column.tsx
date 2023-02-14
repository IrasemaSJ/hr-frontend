import { ColumnsType } from 'antd/es/table';
import { BtnTable } from '../../../components';
import { Dispatch, SetStateAction } from 'react';
import { SetParamsContingnecy } from '../../../hooks/useRequestPage';
import { ContingencyHttp } from '../../../api/interfaces';

interface Params {
  setParams: ({ record, openModal }: SetParamsContingnecy) => Promise<void>;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  setModalDelete: Dispatch<SetStateAction<boolean>>;
  employee_id: number;
}

export const lastColumn = ({
  setParams,
  setModalEdit,
  setModalDelete,
  employee_id,
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
              action="cancel"
              onClick={() =>
                setParams({
                  record,
                  openModal: setModalDelete,
                })
              }
            />
          </>
        ) : employee_id !== 0 && record.status === 'approved' ? (
          <BtnTable
            action="cancel"
            onClick={() =>
              setParams({
                record,
                openModal: setModalDelete,
              })
            }
          />
        ) : (
          <></>
        ),
      align: 'center',
    },
  ];

  return lastColumn;
};
