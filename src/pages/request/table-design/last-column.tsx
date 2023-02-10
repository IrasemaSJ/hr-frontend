import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined } from '@ant-design/icons';
import { ContingencyHttp } from '../../../api/interfaces';
import { SetParamsContingnecy } from '../../../hooks/useRequestPage';
import { Dispatch, SetStateAction } from 'react';
import { BtnTable } from '../../../components';

interface Params {
  setParams: ({ record, openModal }: SetParamsContingnecy) => Promise<void>;
  setModalAprove: Dispatch<SetStateAction<boolean>>
  setModalReject: Dispatch<SetStateAction<boolean>>
}

export const lastColumn = ({
  setParams,
  setModalAprove,
  setModalReject,
}: Params) => {
  const lastColumn: ColumnsType<ContingencyHttp> = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <BtnTable
            action="accept"
            onClick={() =>
              setParams({
                record,
                openModal: setModalAprove,
              })
            }
          />
          <BtnTable
            action="reject"
            onClick={() =>
              setParams({
                record,
                openModal: setModalReject,
              })
            }
          />
        </>
      ),
      align: 'center',
    },
  ];

  return lastColumn;
};
