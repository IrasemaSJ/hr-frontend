import { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
import { Dispatch, SetStateAction } from 'react';
import { ContingencyHttp } from '../../../api/interfaces';
import { SetParams } from '../../../hooks/useRequestPage';

interface Params {
  setParams: ({ record, openModal }: SetParams) => Promise<void>;
  setModalInfo: Dispatch<SetStateAction<boolean>>
}

export const firstRow = ({ setParams, setModalInfo }: Params) => {
  const firstRow: ColumnsType<ContingencyHttp> = [
    {
      title: 'Folio',
      dataIndex: 'folio',
      render: (_, record) => (
        <Link onClick={() => setParams({ record, openModal: setModalInfo })}>
          {record.folio}
        </Link>
      ),
    },
  ];

  return firstRow;
};
