import { Badge, Button, notification, Table, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import ApiHR from '../../api/ApiHR';
import { useHandleError } from '../../hooks/useHandleError';
import { columnsContigencyRequestInfo } from './table-design/contingency-request';
import { ContingenciesTmHttp, ContingencyHttp } from '../../api/interfaces';
import { ModalReject } from '../../components/modals/ModalReject';
import { Loader } from '../../components';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { CheckOutlined } from '@ant-design/icons';
import { ModalAprove } from '../../components/modals/ModalAprove';
import { ModalInfo } from '../../components/modals/ModalInfo';
import Link from 'antd/es/typography/Link';

export const Request = () => {
  //table variables
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // show load table
  const [contingencyRows, setContingencyRows] = useState<ContingencyHttp[]>([]);

  //modal variables
  const [isShowing, setIsShowing] = useState(false); // show reject or aprove loader
  const { contextHolder: errorNotificacion, setServerError } = useHandleError();
  const [modalReject, setModalReject] = useState(false);
  const [modalAprove, setModalAprove] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  //data to set folio and id to aprove or reject
  const [contingency, setContingency] = useState<ContingencyHttp>({
    _id: '',
    folio: '',
    id_employee: 0,
    name_employee: '',
    date: '',
    half_day: false,
    status: '',
    comments: '',
    observations: '',
    id_tm: 0,
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });
  //todo change contextHolder
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    messages: string | string[],
  ) => {
    api.success({
      message: 'Successful Operation',
      description: messages,
      placement,
    });
  };

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

  const updateContingencyStatus = async (data?: { observations: string }) => {
    try {
      const query = data
        ? { status: 'rejected', ...data }
        : { status: 'approved' };
      setIsShowing(true);
      await ApiHR.patch(
        `/contingencies-tm/requests/update-status/${contingency._id}`,
        query,
      );
      setIsShowing(false); //show the loader
      getContingenciesByPage(); // refresh the table
      // close modal and show notification
      if (data) {
        setModalReject(false);
        openNotification('top', 'Contingency rejected');
      } else {
        setModalAprove(false);
        openNotification('top', 'Contingency aproved');
      }
    } catch (error: any) {
      setIsShowing(false);
      setServerError(error);
    }
  };

  const setParams = async ({
    record,
    openModal,
  }: {
    record: ContingencyHttp;
    openModal: (param: boolean) => void;
  }) => {
    setContingency(record);
    openModal(true);
  };

  useEffect(() => {
    getContingenciesByPage();
  }, []);

  return (
    <>
      <h1>Pending Request</h1>
      <Loader show={isShowing} />
      {errorNotificacion}
      {contextHolder}
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
              //set the count in that way to avoid console warning
              <Badge status="warning" count={total > 0 && total}>
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
                    {
                      title: 'Folio',
                      dataIndex: 'folio',
                      render: (_, record) => (
                        <Link
                          onClick={() =>
                            setParams({ record, openModal: setModalInfo })
                          }
                        >
                          {record.folio}
                        </Link>
                      ),
                    },
                    ...columnsContigencyRequestInfo,
                    {
                      title: 'Actions',
                      dataIndex: 'actions',
                      render: (_, record) => (
                        <>
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<CheckOutlined />}
                            style={{ background: 'green', margin: '2px' }}
                            onClick={() =>
                              setParams({
                                record,
                                openModal: setModalAprove,
                              })
                            }
                          />
                          <Button
                            type="primary"
                            shape="circle"
                            icon={'X'}
                            style={{ background: 'red', margin: '2px' }}
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
      <ModalAprove
        changeStatus={updateContingencyStatus}
        folio={contingency.folio}
        isModalOpen={modalAprove}
        closeModal={() => setModalAprove(false)}
      />

      <ModalReject
        changeStatus={updateContingencyStatus}
        folio={contingency.folio}
        isModalOpen={modalReject}
        closeModal={() => setModalReject(false)}
      />
      <ModalInfo
        record={contingency}
        isModalOpen={modalInfo}
        closeModal={() => setModalInfo(false)}
      />
    </>
  );
};
