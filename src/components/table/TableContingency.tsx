import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import ApiHR from '../../api/ApiHR';

export const TableContingency = ({ columns }: { columns: any }) => {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const getRegistersByPage = async (page?: number) => {
    setIsLoading(true);
    const { data } = await ApiHR(`/contingencies?page=${page || 1}`);
    console.log(data);
    setRows(data.docs);
    setTotal(data.totalDocs);
    setIsLoading(false);
  };

  useEffect(() => {
    getRegistersByPage();
  }, []);

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={'_id'}
        dataSource={rows}
        pagination={{
          pageSize: 5,
          total,
          onChange(page) {
            getRegistersByPage(page);
          },
        }}
      />
    </div>
  );
};
