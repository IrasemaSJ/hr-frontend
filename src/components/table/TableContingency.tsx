import { Table } from 'antd';
import { useState, useEffect } from 'react';
import ApiHR from '../../api/ApiHR';
import { ColumnsType } from 'antd/es/table';
import { useHandleError } from '../../hooks/useHandleError';

interface Props {
  designTable: ColumnsType<any>;
  url: string;
}

export const TableContingency = ({ designTable, url }: Props) => {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { contextHolder, setServerError } = useHandleError();

  const getRegistersByPage = async (page?: number) => {
    try {
      setIsLoading(true);
      const { data } = await ApiHR(`${url}?page=${page || 1}`);
      setRows(data.docs);
      setTotal(data.totalDocs);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  useEffect(() => {
    getRegistersByPage();
  }, []);

  return (
    <>
      {contextHolder}
      <Table
        loading={isLoading}
        columns={designTable}
        rowKey={'_id'}
        dataSource={rows}
        pagination={{
          pageSize: 5,
          total,
          onChange(page) {
            getRegistersByPage(page);
          },
          hideOnSinglePage: true,
        }}
      />
    </>
  );
};
