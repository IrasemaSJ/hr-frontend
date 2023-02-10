import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dispatch, SetStateAction } from 'react';
import { ContingencyHttp } from '../../../api/interfaces';
import { SetParamsContingnecy } from '../../../hooks/useRequestPage';

interface Params {
  setParams: ({ record, openModal }: SetParamsContingnecy) => Promise<void>;
  setModalInfo: Dispatch<SetStateAction<boolean>>
}

export const firstColumn = ({ setParams, setModalInfo }: Params) => {
  const firstColumn: ColumnsType<ContingencyHttp> = [
    {
      title: 'Folio',
      dataIndex: 'folio',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => setParams({ record, openModal: setModalInfo })}
        >
          {record.folio}
        </Button>
      ),
    },
  ];

  return firstColumn;
};
