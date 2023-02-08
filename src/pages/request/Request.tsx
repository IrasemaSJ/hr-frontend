import { Badge, Table, Tabs } from 'antd';
import {
  firstRow,
  columnsContigencyRequestInfo,
  lastRow,
} from './table-design';
import { ModalReject } from '../../components/modals/ModalReject';
import { Loader } from '../../components';
import { ModalAprove } from '../../components/modals/ModalAprove';
import { ModalInfo } from '../../components/modals/ModalInfo';
import { useRequestPage } from '../../hooks';

export const Request = () => {
  //get variables from customhook
  const {
    contingency,
    total,
    isLoadingTable,
    contingencyRows,
    isLoadingRequest,
    modalReject,
    modalAprove,
    modalInfo,
    setModalInfo,
    setModalAprove,
    setModalReject,
    getContingenciesByPage,
    updateContingencyStatus,
    setParams,
    contextHolder,
  } = useRequestPage();

  return (
    <>
      <h1>Pending Request</h1>
      {/* show loader outside table */}
      <Loader show={isLoadingRequest} />
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
              <>
                {/* TODO: warning is still appearing */}
                <Badge status="warning" count={total}>
                  <div style={{ padding: '5px' }}>Contingency</div>
                </Badge>
              </>
            ),
            key: '2',
            children: (
              <Table
                loading={isLoadingTable}
                columns={[
                  ...firstRow({ setParams, setModalInfo }),
                  ...columnsContigencyRequestInfo,
                  ...lastRow({
                    setParams,
                    setModalAprove,
                    setModalReject,
                  }),
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

      {/*--------------------------------------- Modals ---------------------------------*/}
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
