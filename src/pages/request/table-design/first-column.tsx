import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dispatch, SetStateAction } from 'react';
import { ContingencyHttp } from '../../../api/interfaces';
import { SetParams } from '../../../hooks/useRequestPage';

interface Params {
  setParams: ({ record, openModal }: SetParams) => Promise<void>;
  setModalInfo: Dispatch<SetStateAction<boolean>>;
}

export const firstColumn = ({ setParams, setModalInfo }: Params) => {
  const firstRow: ColumnsType<ContingencyHttp> = [
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

  return firstRow;
};
