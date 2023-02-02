import { Badge, Button, Form, Table, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import ApiHR from '../../api/ApiHR';
import { useHandleError } from '../../hooks/useHandleError';
import { columnsContigencyRequestInfo } from './table-design/contingency-request';
import { ContingenciesTmHttp, ContingencyHttp } from '../../api/interfaces';
import { ModalReject } from '../../components/modals/ModalReject';
import { Loader } from '../../components';

export const Request = () => {
  //table variables
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // show load table
  const [contingencyRows, setContingencyRows] = useState<ContingencyHttp[]>([]);

  //modal variables
  const [isShowing, setIsShowing] = useState(false); // show reject or aprove loader
  const { contextHolder, setServerError } = useHandleError();
  const [modalContingency, setModalContingency] = useState(false);
  //data to set folio and id to aprove or reject
  const [contingency, setContingency] = useState({ folio: '', id: '' });

  const getContingenciesByPage = async (page?: number) => {
    try {
      setIsLoading(true);
      const { data } = await ApiHR<ContingenciesTmHttp>(
        `/contingencies-tm/requests?page=${page ?? 1}`,
      );
      setContingencyRows(data.docs);
      setTotal(data.totalDocs);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  const updateContingencyStatus = async (data: { observations: string }) => {
    try {
      setIsShowing(true);
      await ApiHR.patch(
        `/contingencies-tm/requests/update-status/${contingency.id}`,
        {
          status: 'rejected',
          ...data,
        },
      );
      setIsShowing(false); //show the loader
      getContingenciesByPage(); // refresh the table
      setModalContingency(false); // close modal
    } catch (error: any) {
      setIsShowing(false);
      setServerError(error);
    }
  };

  const setParams = async ({ _id, folio }: { _id: string; folio: string }) => {
    setContingency({ id: _id, folio });
    setModalContingency(true);
  };

  useEffect(() => {
    getContingenciesByPage();
  }, []);

  return (
    <>
      <h1>Pending Request</h1>
      <Loader show={isShowing} />
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: (
              <Badge status="processing">
                <div style={{ padding: '5px' }}>Vacations</div>
              </Badge>
            ),
            key: '1',
            children: '',
          },
          {
            label: (
              <Badge status="warning" count={total}>
                <div style={{ padding: '5px' }}>Contingency</div>
              </Badge>
            ),
            key: '2',
            children: (
              <>
                {contextHolder}
                <Table
                  loading={isLoading}
                  columns={[
                    ...columnsContigencyRequestInfo,
                    {
                      title: 'Actions',
                      render: (_, { folio, _id }) => (
                        <Button
                          type="primary"
                          shape="circle"
                          icon={'X'}
                          style={{ background: 'red', margin: '2px' }}
                          onClick={() => setParams({ folio, _id })}
                        />
                      ),
                      align: 'center',
                    },
                  ]}
                  rowKey={'_id'}
                  dataSource={contingencyRows}
                  onChange={() => getContingenciesByPage()}
                  pagination={{
                    pageSize: 5,
                    total,
                    onChange(page) {
                      getContingenciesByPage(page);
                    },
                    hideOnSinglePage: true,
                    showTotal(total, range) {
                      return `${range[0]}-${range[1]} of ${total} items`;
                    },
                  }}
                />
              </>
            ),
          },
          {
            label: (
              <Badge status="warning" count={0}>
                <div style={{ padding: '5px' }}>Time by Time</div>
              </Badge>
            ),
            key: '3',
            children: `Content of tab`,
          },
        ]}
      />

      {/* Modals */}
      <ModalReject
        changeStatus={updateContingencyStatus}
        folio={contingency.folio}
        isModalOpen={modalContingency}
        closeModal={() => setModalContingency(false)}
      />
    </>
  );
};
